
import React, { useState } from 'react';
import { Settings, Bell, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import NotificationsPanel from '@/components/notifications/NotificationsPanel';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';

const AccountMenu = () => {
  const { signOut } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // For demo purposes, show 2 unread notifications
  const unreadCount = 2;

  return (
    <>
      <div className={`${!isCollapsed ? 'mt-1' : 'mt-4'}`}>
        {!isCollapsed && (
          <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">Account</h3>
        )}
        <SidebarMenu className="grid gap-1">
          <SidebarMenuItem>
            <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <PopoverTrigger asChild>
                <SidebarMenuButton tooltip="Notifications">
                  <Bell className="h-4 w-4 mr-3" />
                  <span>{!isCollapsed && "Notifications"}</span>
                  {unreadCount > 0 && (
                    <Badge className="ml-auto bg-primary text-xs py-0 h-5 min-w-5 flex items-center justify-center">
                      {unreadCount}
                    </Badge>
                  )}
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0 w-auto" sideOffset={5}>
                <NotificationsPanel onClose={() => setNotificationsOpen(false)} />
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <NavLink 
                to="/settings" 
                className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
              >
                <Settings className="h-4 w-4 mr-3" />
                <span>{!isCollapsed && "Settings"}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => signOut()}
              tooltip="Logout"
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span>{!isCollapsed && "Logout"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </>
  );
};

export default AccountMenu;
