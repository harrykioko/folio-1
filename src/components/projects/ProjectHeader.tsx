
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogTrigger } from "@/components/ui/dialog";

interface ProjectHeaderProps {
  name: string;
  description: string;
  status: string;
  projectId: string | number;
  setIsEditDialogOpen: (value: boolean) => void;
  setIsDeleteDialogOpen: (value: boolean) => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  name,
  description,
  status,
  projectId,
  setIsEditDialogOpen,
  setIsDeleteDialogOpen,
}) => {
  const navigate = useNavigate();

  const handleAddTask = () => {
    // Navigate to new task form with project ID in the URL as a query parameter
    navigate(`/tasks/new?projectId=${projectId}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/projects")} size="sm">
            Back
          </Button>
          <Badge variant={status === 'completed' ? 'secondary' : 'default'}>
            {status === 'completed' ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : (
              <Clock className="mr-1 h-3 w-3" />
            )}
            {status === 'completed' ? 'Completed' : 'In Progress'}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold mt-2">{name}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Project
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive"
              onSelect={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button onClick={handleAddTask}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
    </div>
  );
};

export default ProjectHeader;
