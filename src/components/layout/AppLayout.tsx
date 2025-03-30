
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import CommandPalette from "../CommandPalette";

const AppLayout: React.FC = () => {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b h-14 flex items-center px-4 sm:px-6">
            <SidebarTrigger className="mr-4" />
            <h1 className="font-semibold text-lg">Folio</h1>
            <div className="ml-auto flex items-center gap-2">
              <div className="text-sm text-muted-foreground hidden md:block">
                Press{" "}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
              <button
                onClick={() => setCommandOpen(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                <span className="md:hidden">Search...</span>
                <span className="hidden md:inline">Search commands...</span>
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="container py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </SidebarProvider>
  );
};

export default AppLayout;
