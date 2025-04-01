
import React, { useState } from "react";
import { LightbulbIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/utils/projectUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FolderOpen } from "lucide-react";

interface EmptyContextStateProps {
  onActionClick: (action: string) => void;
  onProjectSelect?: (projectId: number) => void;
}

export const EmptyContextState: React.FC<EmptyContextStateProps> = ({
  onActionClick,
  onProjectSelect = () => {},
}) => {
  const [showProjectSelect, setShowProjectSelect] = useState(false);

  const handleProjectSelect = (projectId: string) => {
    onProjectSelect(Number(projectId));
    setShowProjectSelect(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-6">
        <LightbulbIcon className="h-10 w-10 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">Current Context</h3>
      <p className="text-muted-foreground mb-6">
        Use the chat or suggested actions below to get started.
      </p>
      
      <div className="space-y-4 max-w-md w-full">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Try asking me about:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Summarizing a project</li>
            <li>• Searching for a prompt or generating a new one</li>
            <li>• Creating a new task or assigning teammates</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => onActionClick("Create a new task")}
          >
            <span className="mr-2">➕</span> Create task
          </Button>
          
          {showProjectSelect ? (
            <Select onValueChange={handleProjectSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={() => setShowProjectSelect(true)}
            >
              <FolderOpen className="mr-2 h-4 w-4" /> Open project
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => onActionClick("Create a new prompt for welcome emails")}
          >
            <span className="mr-2">✏️</span> New prompt
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => onActionClick("Draft notes for tomorrow's client meeting")}
          >
            <span className="mr-2">📄</span> Meeting notes
          </Button>
        </div>
      </div>
    </div>
  );
};
