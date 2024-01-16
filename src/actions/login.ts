"use server";

import * as z from "zod";
import { wait } from "@/lib/utils";
import { LoginSchema, RegisterSchema } from "@/schemas";

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(data);

    await wait(2000);

    if (!validatedFields.success) {
        // throw new Error(validatedFields.error.message);
        return { error: "Invalid fields!" };
    }

    return { success: "Email sent!" };
};
