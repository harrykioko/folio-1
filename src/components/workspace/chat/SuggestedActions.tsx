
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileSearch, Calendar, ListTodo } from "lucide-react";

export const SuggestedActions: React.FC = () => {
  const suggestions = [
    { id: 1, icon: <FileSearch className="mr-2 h-4 w-4" />, label: "Project summary", action: "Show me a summary of the Harvest LMS project" },
    { id: 2, icon: <ListTodo className="mr-2 h-4 w-4" />, label: "Create task", action: "Create a new task for the marketing website" },
    { id: 3, icon: <Calendar className="mr-2 h-4 w-4" />, label: "Meeting notes", action: "Draft notes for tomorrow's client meeting" },
    { id: 4, icon: <PlusCircle className="mr-2 h-4 w-4" />, label: "New prompt", action: "Create a new prompt for welcome emails" },
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
            onClick={() => console.log(suggestion.action)}
          >
            {suggestion.icon}
            {suggestion.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
