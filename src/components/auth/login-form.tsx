import { CardWrapper } from "@/components/auth/card-wrapper";

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial
        >
            LoginForm
        </CardWrapper>
    );
};
