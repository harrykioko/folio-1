
import React from 'react';
import { UserIcon, Lock, LogOut, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';

const AccountMenu = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className={`${!isCollapsed ? 'mt-6' : 'mt-4'}`}>
      {!isCollapsed && (
        <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">Account</h3>
      )}
      <SidebarMenu className="grid gap-1">
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Profile">
            <NavLink 
              to="/settings" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <UserIcon className="h-4 w-4 mr-3" />
              <span>{!isCollapsed && "Profile"}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Security">
            <NavLink 
              to="/settings?tab=security" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <Lock className="h-4 w-4 mr-3" />
              <span>{!isCollapsed && "Security"}</span>
            </NavLink>
          </SidebarMenuButton>
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
  );
};

export default AccountMenu;
