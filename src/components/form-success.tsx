import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
    message?: string;
}

export const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="flex items-center justify-center gap-x-2 rounded-md bg-primary/15 p-3 text-sm text-primary">
            <CheckCircledIcon className="h-4 w-4" />
            <p>{message}</p>
        </div>
    );
};
