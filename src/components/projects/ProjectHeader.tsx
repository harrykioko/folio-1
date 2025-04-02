
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Clock, Edit2, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";

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
    navigate(`/tasks/new?projectId=${projectId}`);
  };
  
  // Map status values to display texts
  const statusMap: Record<string, { text: string, color: string, icon: React.ReactNode }> = {
    active: { 
      text: "Active", 
      color: "bg-green-100 text-green-800 border-green-200",
      icon: <CheckCircle2 className="mr-1 h-3 w-3" />
    },
    development: { 
      text: "In Development", 
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Clock className="mr-1 h-3 w-3" />
    },
    ideation: { 
      text: "Ideation", 
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: <Edit2 className="mr-1 h-3 w-3" />
    },
    archive: { 
      text: "Archived", 
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: <Clock className="mr-1 h-3 w-3" />
    }
  };

  const currentStatus = statusMap[status] || statusMap.development;

  return (
    <div className="mb-8 border-b pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate("/projects")} 
            size="sm"
            className="rounded-xl"
          >
            Back
          </Button>
          
          <Select defaultValue={status}>
            <SelectTrigger className={`w-[180px] border ${currentStatus.color} rounded-xl h-9 px-3`}>
              <SelectValue>
                <div className="flex items-center">
                  {currentStatus.icon}
                  <span>{currentStatus.text}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active" className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                Active
              </SelectItem>
              <SelectItem value="development" className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-blue-600" />
                In Development
              </SelectItem>
              <SelectItem value="ideation" className="flex items-center">
                <Edit2 className="mr-2 h-4 w-4 text-purple-600" />
                Ideation
              </SelectItem>
              <SelectItem value="archive" className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-600" />
                Archived
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-xl">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onSelect={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={handleAddTask} className="rounded-xl">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mt-2 text-foreground">{name}</h1>
      <p className="text-muted-foreground mt-1 max-w-3xl">{description}</p>
    </div>
  );
};

export default ProjectHeader;
