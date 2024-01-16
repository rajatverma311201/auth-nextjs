import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { wait } from "@/lib/utils";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(data);

    await wait(2000);

    if (!validatedFields.success) {
        // throw new Error(validatedFields.error.message);
        return { error: "Invalid fields!" };
    }

    return { success: "Email sent!" };
};
