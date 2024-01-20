"use client";

import { UserRole } from "@prisma/client";

import { useUserRole } from "@/hooks/use-user-role";
import { FormError } from "@/components/form-error";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

export const RoleGate: React.FC<RoleGateProps> = ({
    children,
    allowedRole,
}) => {
    const role = useUserRole();

    if (role !== allowedRole) {
        return (
            <FormError message="You do not have permission to view this content!" />
        );
    }

    return <>{children}</>;
};
