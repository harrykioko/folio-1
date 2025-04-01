
import React from "react";
import { NavLink } from "react-router-dom";
import { CheckSquare, MessageSquare, Users } from "lucide-react";
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/components/ui/sidebar";

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
          <SidebarMenuButton asChild tooltip="Messages">
            <NavLink 
              to="/messages" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <MessageSquare className="h-4 w-4 mr-3" />
              <span>{!isCollapsed && "Messages"}</span>
              {!isCollapsed && <Badge className="ml-auto bg-primary text-white h-5 px-1">3</Badge>}
              {isCollapsed && <Badge className="absolute -top-1 -right-1 bg-primary text-white h-4 w-4 flex items-center justify-center p-0 text-[10px] rounded-full">3</Badge>}
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
