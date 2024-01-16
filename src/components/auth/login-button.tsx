"use client";

import { useRouter } from "next/navigation";

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
            <div className="cursor-pointer" onClick={clickHandler}>
                TODO : Implement Login Modal
            </div>
        );
    }

    return (
        <span className="cursor-pointer" onClick={clickHandler}>
            {children}
        </span>
    );
};
