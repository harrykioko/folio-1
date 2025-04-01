
import React from "react";
import { CircleUser, LogOut, Settings } from "lucide-react";
import { SidebarMenu } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

const AccountMenu: React.FC = () => {
  const { signOut, userMetadata } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        Account
      </h2>
      <SidebarMenu>
        <SidebarMenu.Item
          title={userMetadata?.fullName || "Profile"}
          icon={<CircleUser className="h-4 w-4" />}
          href="/settings"
        />
        <SidebarMenu.Item
          title="Settings"
          icon={<Settings className="h-4 w-4" />}
          href="/settings"
        />
        <SidebarMenu.Item
          title="Sign Out"
          icon={<LogOut className="h-4 w-4" />}
          onClick={handleSignOut}
        />
      </SidebarMenu>
    </div>
  );
};

export default AccountMenu;
