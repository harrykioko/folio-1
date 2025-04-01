
import React, { useState } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import NotificationsPanel from "@/components/notifications/NotificationsPanel";

const AccountMenu: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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
            <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <PopoverTrigger asChild>
                <SidebarMenuButton
                  tooltip={isCollapsed ? "Notifications" : undefined}
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                  {!isCollapsed && <Badge className="ml-auto bg-primary text-white h-5 px-1">2</Badge>}
                  {isCollapsed && <Badge className="absolute -top-1 -right-1 bg-primary text-white h-4 w-4 flex items-center justify-center p-0 text-[10px] rounded-full">2</Badge>}
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="p-0 w-auto border-none shadow-lg" sideOffset={12}>
                <NotificationsPanel onClose={() => setNotificationsOpen(false)} />
              </PopoverContent>
            </Popover>
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
