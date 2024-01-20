import { UserInfo } from "@/components/auth/user-info";
import { currentUser } from "@/lib/auth";

interface ServerPageProps {}

const ServerPage: React.FC<ServerPageProps> = async ({}) => {
    const user = await currentUser();
    console.log(user);
    return (
        <>
            <UserInfo label="💻 Server component" user={user} />
        </>
    );
};
export default ServerPage;
