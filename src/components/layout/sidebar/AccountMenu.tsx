
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Bell, Settings, LogOut } from "lucide-react";
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  useSidebar
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const AccountMenu: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    // In a real app, perform actual logout
    navigate("/login");
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Account</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={isCollapsed ? "Notifications" : undefined}
              onClick={() => console.log("Notifications clicked")}
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
              {!isCollapsed && <Badge className="ml-auto bg-primary text-white h-5 px-1">2</Badge>}
              {isCollapsed && <Badge className="absolute -top-1 -right-1 bg-primary text-white h-4 w-4 flex items-center justify-center p-0 text-[10px] rounded-full">2</Badge>}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              tooltip={isCollapsed ? "Settings" : undefined}
              onClick={() => navigate("/settings")}
              asChild
            >
              <NavLink 
                to="/settings" 
                className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
              >
                <Settings className="h-4 w-4 mr-3" />
                <span>Settings</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              tooltip={isCollapsed ? "Sign Out" : undefined}
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default AccountMenu;
