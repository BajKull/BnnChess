import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import TwitchProvider from "next-auth/providers/twitch";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID || "",
      clientSecret: process.env.TWITCH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    session: async ({ token }: { token: JWT }) => {
      const data = {
        expires: token.expires,
        user: token.user,
      };
      return data;
    },
  },
};

export default NextAuth(authOptions);
