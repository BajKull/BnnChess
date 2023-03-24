import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    authToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    image: string;
    email: string;
    authToken: string;
    expires: number;
    refreshToken: string;
  }
}
