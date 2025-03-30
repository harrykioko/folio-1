
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarNavLink,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  BarChart2,
  FolderGit,
  KeySquare,
  Lightbulb,
  CheckSquare,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, perform actual logout
    navigate("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-primary p-1 rounded-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary-foreground"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>
          <div className="font-bold text-xl">Folio</div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-2">
        <SidebarNav className="grid gap-1">
          <SidebarNavLink asChild>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <BarChart2 className="h-4 w-4 mr-3" />
              Dashboard
            </NavLink>
          </SidebarNavLink>
          <SidebarNavLink asChild>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <FolderGit className="h-4 w-4 mr-3" />
              Projects
            </NavLink>
          </SidebarNavLink>
          <SidebarNavLink asChild>
            <NavLink 
              to="/accounts" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <KeySquare className="h-4 w-4 mr-3" />
              Accounts
            </NavLink>
          </SidebarNavLink>
          <SidebarNavLink asChild>
            <NavLink 
              to="/prompts" 
              className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
            >
              <Lightbulb className="h-4 w-4 mr-3" />
              Prompt Library
            </NavLink>
          </SidebarNavLink>
        </SidebarNav>

        <div className="mt-6">
          <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">Tools</h3>
          <SidebarNav className="grid gap-1">
            <SidebarNavLink asChild>
              <NavLink 
                to="/tasks" 
                className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
              >
                <CheckSquare className="h-4 w-4 mr-3" />
                Tasks
              </NavLink>
            </SidebarNavLink>
            <SidebarNavLink asChild>
              <NavLink 
                to="/messages" 
                className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
              >
                <MessageSquare className="h-4 w-4 mr-3" />
                Messages
                <Badge className="ml-auto bg-primary text-white h-5 px-1">3</Badge>
              </NavLink>
            </SidebarNavLink>
            <SidebarNavLink asChild>
              <NavLink 
                to="/team" 
                className={({ isActive }) => isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
              >
                <Users className="h-4 w-4 mr-3" />
                Team
              </NavLink>
            </SidebarNavLink>
          </SidebarNav>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Bell className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => navigate("/settings")}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
