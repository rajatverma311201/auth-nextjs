"use client";
import { logout } from "@/actions/logout";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = ({}) => {
    const user = useUser();
    // console.log(session?.user);

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <h1>SettingsPage</h1>

            <Button
                type="submit"
                variant={"destructive"}
                onClick={handleLogout}
            >
                Logout
            </Button>

            {/* <pre>{JSON.stringify(session)}</pre> */}
        </>
    );
};
export default SettingsPage;
