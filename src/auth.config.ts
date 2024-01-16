import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),

        Credentials({
            authorize: async (creds) => checkAuth(creds),
        }),
    ],
} satisfies NextAuthConfig;

const checkAuth = async (creds: any) => {
    const validatedFields = LoginSchema.safeParse(creds);

    if (!validatedFields.success) {
        return null;
    }

    const { email, password } = validatedFields.data;

    const user = await getUserByEmail(email);

    if (!user || !user.password) {
        return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return null;
    }

    return user;
};
