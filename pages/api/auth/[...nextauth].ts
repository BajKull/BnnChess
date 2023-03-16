import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID || "",
      clientSecret: process.env.TWITCH_CLIENT_SECRET || "",
    }),
  ],
};

console.log(process.env.TWITCH_CLIENT_SECRET);

export default NextAuth(authOptions);
