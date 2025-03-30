
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    // In a real app, perform actual logout
    navigate("/login");
  };

  // Detect mobile screens and automatically collapse sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && state === "expanded") {
        toggleSidebar();
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [state, toggleSidebar]);

  return (
    <Sidebar className="glassmorphism transition-all duration-300 ease-in-out border-r border-white/10">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/80 p-1 rounded-md flex items-center justify-center">
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
          {!isCollapsed && <div className="font-bold text-xl">Folio</div>}
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-2">
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
      </SidebarContent>

      <SidebarFooter className={`p-4 border-t ${isCollapsed ? 'border-white/10' : ''}`}>
        <div className="flex items-center justify-between">
          {!isCollapsed ? (
            <>
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
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full space-y-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Settings</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
        
        {/* Toggle sidebar button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar}
          className="w-full mt-4 flex items-center justify-center text-xs text-muted-foreground border border-border/40 hover:bg-secondary/40"
        >
          {isCollapsed ? <ChevronRight size={14} /> : (
            <>
              <ChevronLeft size={14} className="mr-1" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
