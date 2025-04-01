
import React from "react";
import { Search } from "lucide-react";
import { SidebarInput, useSidebar } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SidebarHeader: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="p-4 space-y-4">
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
