"use client";

import { UserInfo } from "@/components/auth/user-info";
import { useUser } from "@/hooks/use-user";

interface ClientPageProps {}

const ClientPage: React.FC<ClientPageProps> = ({}) => {
    const user = useUser();
    console.log(user);
    return (
        <>
            <UserInfo label="💻 Client component" user={user} />
        </>
    );
};
export default ClientPage;
