
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator 
} from "@/components/ui/command";
import { 
  BarChart2, 
  Users, 
  FolderGit, 
  KeySquare, 
  Lightbulb, 
  MessageSquare, 
  CheckSquare, 
  Settings 
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange, open]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="max-h-[400px]">
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Pages">
          <CommandItem
            onSelect={() => runCommand(() => navigate("/dashboard"))}
            className="flex items-center"
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/projects"))}
            className="flex items-center"
          >
            <FolderGit className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/accounts"))}
            className="flex items-center"
          >
            <KeySquare className="mr-2 h-4 w-4" />
            <span>Accounts</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/prompts"))}
            className="flex items-center"
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            <span>Prompt Library</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Tools">
          <CommandItem
            onSelect={() => runCommand(() => navigate("/tasks"))}
            className="flex items-center"
          >
            <CheckSquare className="mr-2 h-4 w-4" />
            <span>Tasks</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/messages"))}
            className="flex items-center"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Messages</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/team"))}
            className="flex items-center"
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Settings">
          <CommandItem
            onSelect={() => runCommand(() => navigate("/settings"))}
            className="flex items-center"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
