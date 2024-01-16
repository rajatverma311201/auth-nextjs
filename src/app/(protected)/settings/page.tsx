import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = async ({}) => {
    const session = await auth();

    console.log(session?.user);

    const handleLogout = async () => {
        "use server";
        await signOut({
            redirectTo: "/auth/login",
        });
    };

    return (
        <>
            <h1>SettingsPage</h1>

            <form action={handleLogout}>
                <Button type="submit" variant={"destructive"}>
                    Logout
                </Button>
            </form>

            {/* <pre>{JSON.stringify(session)}</pre> */}
        </>
    );
};
export default SettingsPage;
