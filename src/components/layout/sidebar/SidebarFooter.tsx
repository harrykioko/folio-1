
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useProfileData } from "@/components/settings/account/profile/useProfileData";

const SidebarFooter: React.FC = () => {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { getInitials, getDisplayName, getEmail } = useProfileData();

  return (
    <div className={`p-4 border-t ${isCollapsed ? 'border-white/10' : ''}`}>
      <div className="flex items-center justify-between">
        {!isCollapsed ? (
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{getDisplayName()}</p>
              <p className="text-xs text-muted-foreground">{getEmail()}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
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
    </div>
  );
};

export default SidebarFooter;
