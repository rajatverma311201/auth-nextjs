import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type User = DefaultSession["user"] & {
    role: UserRole;
};

declare module "next-auth" {
    interface Session {
        user: User;
    }
}
