"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
    children,
    mode = "redirect",
    asChild,
}) => {
    const router = useRouter();

    const clickHandler = () => {
        console.log("[LoginButton]\n clickHandler() ");
        if (mode === "redirect") {
            router.push("/auth/login");
        }
    };

    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
                <DialogContent className="w-auto border-none bg-transparent p-0">
                    <LoginForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <span className="cursor-pointer" onClick={clickHandler}>
            {children}
        </span>
    );
};
