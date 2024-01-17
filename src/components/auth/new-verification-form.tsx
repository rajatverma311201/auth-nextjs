"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiLoader3Fill } from "react-icons/ri";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { newVerification } from "@/actions/new-verification-token";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(async () => {
        if (success || error) return;

        if (!token) {
            setError("Missing token!");
            return;
        }

        try {
            const data = await newVerification(token);
            setSuccess(data.success);
            setError(data.error);
        } catch (err) {
            setError("Something went wrong!");
        }
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex w-full items-center justify-center">
                {!success && !error && (
                    <RiLoader3Fill
                        className="animate-spin text-primary"
                        size={50}
                    />
                )}
                <FormSuccess message={success} />
                {!success && <FormError message={error} />}
            </div>
        </CardWrapper>
    );
};
