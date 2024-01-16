"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { wait } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(data);

    if (!validatedFields.success) {
        // throw new Error(validatedFields.error.message);
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;

    const emailExists = await getUserByEmail(email);

    if (emailExists) {
        return { error: "Email already in use!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    return { success: "Email sent!" };
};
