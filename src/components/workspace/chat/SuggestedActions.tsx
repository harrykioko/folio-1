
import React from "react";
import { Button } from "@/components/ui/button";
import { FileSearch, Calendar, ListTodo, FileEdit, FolderOpen, PlusCircle } from "lucide-react";

interface SuggestedActionsProps {
  onActionClick?: (action: string) => void;
}

export const SuggestedActions: React.FC<SuggestedActionsProps> = ({ 
  onActionClick = () => console.log 
}) => {
  const suggestions = [
    { id: 1, icon: <FileSearch className="mr-2 h-4 w-4" />, label: "Project summary", action: "Show me a summary of the Dashboard X project" },
    { id: 2, icon: <ListTodo className="mr-2 h-4 w-4" />, label: "Create task", action: "Create a new task for the marketing website" },
    { id: 3, icon: <Calendar className="mr-2 h-4 w-4" />, label: "Meeting notes", action: "Draft notes for tomorrow's client meeting" },
    { id: 4, icon: <FileEdit className="mr-2 h-4 w-4" />, label: "New prompt", action: "Create a new prompt for welcome emails" },
    { id: 5, icon: <FolderOpen className="mr-2 h-4 w-4" />, label: "Open project", action: "Open a project" },
  ];

  return (
    <div className="p-3 border-t">
      <p className="text-xs text-muted-foreground mb-2">Suggested actions</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion.id}
            variant="outline"
            size="sm"
            className="flex items-center justify-center text-xs"
            onClick={() => onActionClick(suggestion.action)}
          >
            {suggestion.icon}
            {suggestion.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
