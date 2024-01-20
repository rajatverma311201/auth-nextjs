import { UserInfo } from "@/components/auth/user-info";
import { getUser } from "@/lib/auth";

interface ServerPageProps {}

const ServerPage: React.FC<ServerPageProps> = async ({}) => {
    const user = await getUser();
    console.log(user);
    return (
        <>
            <UserInfo label="💻 Server component" user={user} />
        </>
    );
};
export default ServerPage;
