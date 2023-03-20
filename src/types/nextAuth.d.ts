import { DefaultUser } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    image: string;
    email: string;
    authToken: string;
  }
}
