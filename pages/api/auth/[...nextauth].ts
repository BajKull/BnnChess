import NextAuth, { Account, Profile, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import TwitchProvider from "next-auth/providers/twitch";

type AuthToken = {
  token: JWT;
  user?: User | AdapterUser | undefined;
  account?: Account | null | undefined;
  profile?: Profile | undefined;
  isNewUser?: boolean | undefined;
};

type AuthSession = {
  session: Session;
  user: User | AdapterUser;
  token: JWT;
};

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID || "",
      clientSecret: process.env.TWITCH_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid chat:read user:read:email",
        },
      },
    }),
  ],
  callbacks: {
    jwt: async (token: AuthToken) => {
      if ("profile" in token) {
        return {
          name: token.user?.name || "",
          image: token.user?.image || "",
          email: token.user?.email || "",
          authToken: token.account?.access_token || "",
          expires: token.account?.expires_at || 0,
          refreshToken: token.account?.refresh_token || "",
        };
      }
      if (Date.now() > token.token.expires * 1000) {
        const response = await fetch("https://id.twitch.tv/oauth2/token", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.TWITCH_CLIENT_ID || "",
            client_secret: process.env.TWITCH_CLIENT_SECRET || "",
            grant_type: "refresh_token",
            refresh_token: token.token.refreshToken,
          }),
          method: "POST",
        });

        const newToken = await response.json();
        if (!response.ok) throw newToken;
        return {
          ...token.token,
          authToken: newToken.access_token,
          expires: Math.floor(Date.now() / 1000) + newToken.expires_in,
        };
      }
      return token.token;
    },
    session: async (session: AuthSession) => {
      const s = {
        user: {
          name: session.token.name,
          image: session.token.image,
          email: session.token.email,
          ...session.user,
        },
        authToken: session.token.authToken,
        expires: session.token.expires.toString(),
      };
      return s;
    },
  },
};

export default NextAuth(authOptions);
