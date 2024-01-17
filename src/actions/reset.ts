"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import Mail from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid emaiL!" };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Email not found!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    const mailService = new Mail(passwordResetToken.email);

    //   await sendPasswordResetEmail(
    //     passwordResetToken.email,
    //     passwordResetToken.token,
    //   );

    await mailService.sendPasswordResetEmail(passwordResetToken.token);

    return { success: "Reset email sent!" };
};
