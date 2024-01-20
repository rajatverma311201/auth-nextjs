"use server";
import { isRedirectError } from "next/dist/client/components/redirect";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import {
    generateVerificationToken,
    generateTwoFactorToken,
} from "@/lib/tokens";
import Mail from "@/lib/mail";
import bcrypt from "bcryptjs";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(data);

    if (!validatedFields.success) {
        // throw new Error(validatedFields.error.message);
        return { error: "Invalid fields!" };
    }

    const { email, password, code } = validatedFields.data;
    // console.log({ email, password, code });

    const existingUser = await getUserByEmail(email);

    const isPasswordValid = await bcrypt.compare(
        password,
        existingUser?.password || "",
    );

    if (
        !existingUser ||
        !existingUser.email ||
        !existingUser.password ||
        !isPasswordValid
    ) {
        return { error: "Invalid Credentials" };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email,
        );

        const mailService = new Mail(verificationToken.email);

        await mailService.sendVerificationEmail(verificationToken.token);

        return { success: "Confirmation email sent!" };
    }

    // if (existingUser.isTwoFactorEnabled) {
    //     const twoFactorToken = await generateTwoFactorToken(existingUser.email);

    //     const mailService = new Mail(twoFactorToken.email);

    //     await mailService.sendTwoFactorTokenEmail(twoFactorToken.token);

    //     return { twoFactor: true };
    // }

    if (existingUser.isTwoFactorEnabled) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(
                existingUser.email,
            );

            if (!twoFactorToken) {
                return { error: "Invalid code!" };
            }

            if (twoFactorToken.token !== code) {
                return { error: "Invalid code!" };
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                return { error: "Code expired!" };
            }

            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id },
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id,
            );

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id },
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            });
        } else {
            const twoFactorToken = await generateTwoFactorToken(
                existingUser.email,
            );

            const mailService = new Mail(twoFactorToken.email);
            await mailService.sendTwoFactorTokenEmail(twoFactorToken.token);

            return { twoFactor: true };
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
            // redirectTo: ,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            console.log("ERRRRROOOOOOORRRRRRRR TYPE", error.type);
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error;
        // return;
    }
    return { success: "Email sent!" };
};
