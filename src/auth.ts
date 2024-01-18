import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { type UserRole } from "@prisma/client";
import { type JWT } from "@auth/core/jwt";
import { type User, type Session, Account } from "next-auth/types";

import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";

import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signOut: "/",
        signIn: "/auth/login",
        error: "/auth/error",
    },

    events: {
        linkAccount: async ({ user }) => linkAccountEvent({ user }),
    },

    callbacks: {
        signIn: ({ user, account }) => signInCB({ user, account }),

        session: ({ token, session }) => sessionCB({ token, session }),

        jwt: ({ token }) => jwtCB({ token }),
    },

    adapter: PrismaAdapter(db),

    session: { strategy: "jwt" },

    ...authConfig,
});

interface LinkAccountEventProps {
    user: User;
}
const linkAccountEvent = async ({ user }: LinkAccountEventProps) => {
    await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
    });
};

interface SignInCBProps {
    user: User;
    account: Account | null;
}
const signInCB = async ({ user, account }: SignInCBProps) => {
    if (account?.provider !== "credentials") return true;

    const existingUser = await getUserById(user.id);

    if (!existingUser || !existingUser.emailVerified) {
        return false;
    }

    if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.id,
        );
        if (!twoFactorConfirmation) {
            return false;
        }
        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id },
        });
    }

    return true;
};

interface JWTProps {
    token: JWT;
}
const jwtCB = async ({ token }: JWTProps) => {
    if (token.sub) {
        const user = await getUserById(token.sub);

        if (user) {
            token.role = user.role;
        }
    }

    return token;
};

interface SessionCBProps {
    token: JWT;
    session: Session;
}
const sessionCB = async ({ token, session }: SessionCBProps) => {
    if (token.sub && session.user) {
        session.user.id = token.sub;
    }

    if (token.role && session.user) {
        session.user.role = token.role as UserRole;
    }

    return session;
};
