import { User } from "@/../next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
    user?: User;
    label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
    const isTwoFactorEnabled = user?.isTwoFactorEnabled;

    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-center text-2xl font-semibold">{label}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">ID</p>
                    <p className="rounded-md bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary ">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Name</p>
                    <p className="rounded-md bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary ">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Email</p>
                    <p className="rounded-md bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary ">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Role</p>
                    <p className="rounded-md bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary ">
                        {user?.role}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Two Factor Authentication
                    </p>
                    <Badge
                        variant={isTwoFactorEnabled ? "success" : "destructive"}
                    >
                        {isTwoFactorEnabled ? "ON" : "OFF"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};
