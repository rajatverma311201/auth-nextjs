"use client";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
interface SocialProps {}

export const Social: React.FC<SocialProps> = ({}) => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const clickHandler = (provider: "google" | "github") => {
        console.log("[Social]\n clickHandler() ");
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    };

    return (
        <div className="flex w-full items-center gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => clickHandler("google")}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => clickHandler("github")}
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    );
};
