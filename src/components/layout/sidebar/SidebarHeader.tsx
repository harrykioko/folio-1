
import React from "react";
import { Search } from "lucide-react";
import { SidebarInput, useSidebar } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Logo } from "@/components/ui/logo";

const SidebarHeader: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="p-4 space-y-4">
      <Logo size={isCollapsed ? "sm" : "md"} className={isCollapsed ? "mx-auto" : ""} />
      
      {/* Search input or icon depending on sidebar state */}
      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="w-full flex items-center justify-center h-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
              <Search className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            Global Search
          </TooltipContent>
        </Tooltip>
      ) : (
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <SidebarInput 
            placeholder="Search..." 
            className="pl-8"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                console.log('Search for:', e.currentTarget.value);
                // Here you would implement the search functionality
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
