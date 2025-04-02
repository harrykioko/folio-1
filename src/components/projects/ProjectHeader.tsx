
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
  CheckCircle2, 
  Clock, 
  Edit2, 
  MoreHorizontal, 
  Pencil, 
  Plus, 
  Trash2,
  CalendarDays,
  ChevronLeft
} from "lucide-react";
import { format } from "date-fns";

interface ProjectHeaderProps {
  name: string;
  description: string;
  status: string;
  projectId: string | number;
  startDate: string;
  dueDate: string;
  setIsEditDialogOpen: (value: boolean) => void;
  setIsDeleteDialogOpen: (value: boolean) => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  name,
  description,
  status,
  projectId,
  startDate,
  dueDate,
  setIsEditDialogOpen,
  setIsDeleteDialogOpen,
}) => {
  const navigate = useNavigate();
  
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
  
  // Format dates for display
  const formattedStartDate = startDate ? format(new Date(startDate), 'MMM d, yyyy') : 'Not set';
  const formattedEndDate = dueDate ? format(new Date(dueDate), 'MMM d, yyyy') : 'Not set';
  const lastUpdated = format(new Date(), 'MMM d, yyyy');

  return (
    <div className="mb-8 pb-6 backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg">
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start">
        <div className="space-y-2">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/projects")} 
              size="sm"
              className="p-0 mr-2 h-auto"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span className="text-sm">Back</span>
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold mt-2 text-foreground">{name}</h1>
          <p className="text-muted-foreground max-w-3xl">{description}</p>
          
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Updated {lastUpdated}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>{formattedStartDate} — {formattedEndDate}</span>
            </div>
            <span className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center ${currentStatus.color}`}>
              {currentStatus.icon}
              <span>{currentStatus.text}</span>
            </span>
          </div>
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-xl">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem onSelect={() => navigate(`/tasks/new?projectId=${projectId}`)}>
                <Clock className="mr-2 h-4 w-4" />
                Add Task
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit2 className="mr-2 h-4 w-4" />
                Add Prompt
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
