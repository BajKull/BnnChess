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
        expires: session.session.expires,
      };
      return s;
    },
  },
};

export default NextAuth(authOptions);
