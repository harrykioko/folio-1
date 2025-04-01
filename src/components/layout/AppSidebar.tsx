
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader as SidebarHeaderContainer,
  SidebarFooter as SidebarFooterContainer,
  useSidebar
} from "@/components/ui/sidebar";

// Import our components
import SidebarHeader from "./sidebar/SidebarHeader";
import GeneralMenu from "./sidebar/GeneralMenu";
import ToolsMenu from "./sidebar/ToolsMenu";
import SidebarFooter from "./sidebar/SidebarFooter";

const AppSidebar = () => {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();

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
      <SidebarHeaderContainer>
        <SidebarHeader />
      </SidebarHeaderContainer>
      <SidebarContent className="px-3 py-2">
        <GeneralMenu />
        <ToolsMenu />
      </SidebarContent>
      <SidebarFooterContainer>
        <SidebarFooter />
      </SidebarFooterContainer>
    </Sidebar>
  );
};

export default AppSidebar;
