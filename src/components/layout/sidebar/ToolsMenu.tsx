
import React from "react";
import { NavLink } from "react-router-dom";
import { CheckSquare, Users, Sparkles } from "lucide-react";
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarMenuBadge,
  useSidebar
} from "@/components/ui/sidebar";

const ToolsMenu: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className={`${!isCollapsed ? 'mt-6' : 'mt-4'}`}>
      {!isCollapsed && (
        <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">Tools</h3>
      )}
      <SidebarMenu className="grid gap-1">
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Tasks">
            <NavLink 
              to="/tasks" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <CheckSquare className="h-4 w-4 mr-3" />
              <span>{!isCollapsed && "Tasks"}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Workspace">
            <NavLink 
              to="/workspace" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <Sparkles className="h-4 w-4 mr-3" />
              <span>{!isCollapsed && "Workspace"}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Team">
            <NavLink 
              to="/team" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <Users className="h-4 w-4 mr-3" />
              <span>{!isCollapsed && "Team"}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
};

export default ToolsMenu;
