"use server";

import { getUserRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
    const role = await getUserRole();

    if (role === UserRole.ADMIN) {
        return { success: "Allowed Server Action!" };
    }

    return { error: "Forbidden Server Action!" };
};
