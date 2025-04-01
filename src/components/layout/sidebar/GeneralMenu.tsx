
import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart2, FolderGit, KeySquare, Lightbulb } from "lucide-react";
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

const GeneralMenu: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className={`${!isCollapsed ? 'mb-3 px-2' : 'mb-2'}`}>
      {!isCollapsed && (
        <h3 className="text-xs font-medium text-muted-foreground mb-2">General</h3>
      )}
      <SidebarMenu className="grid gap-1">
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Dashboard">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <BarChart2 className="h-4 w-4 mr-3" />
              <span>{!isCollapsed && "Dashboard"}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Projects">
            <NavLink 
              to="/projects" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <FolderGit className="h-4 w-4 mr-3" />
              <span>{!isCollapsed && "Projects"}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Accounts">
            <NavLink 
              to="/accounts" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <KeySquare className="h-4 w-4 mr-3" />
              <span>{!isCollapsed && "Accounts"}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Prompt Library">
            <NavLink 
              to="/prompts" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <Lightbulb className="h-4 w-4 mr-3" />
              <span>{!isCollapsed && "Prompt Library"}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
};

export default GeneralMenu;
