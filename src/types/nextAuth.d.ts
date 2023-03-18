import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    authToken: string;
  }

  interface Session {
    expires: number;
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    expires: number;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      authToken: string;
    };
    iat: number;
    exp: number;
    jti: string;
  }
}
