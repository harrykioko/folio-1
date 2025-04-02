
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Edit, Trash, Clock, User } from "lucide-react";
import { Task } from "@/utils/tasks/types";
import { useUsers } from "@/hooks/useUsers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface TaskHeaderProps {
  task: Task;
  formattedTask: {
    title: string;
    status: string;
    priority: string;
    project: string;
    projectId?: number | null;
    assignee?: string | null;
    dueDate?: string;
    created?: string;
  };
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  setIsDeleteDialogOpen: (value: boolean) => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({
  task,
  formattedTask,
  isEditMode,
  setIsEditMode,
  setIsDeleteDialogOpen,
}) => {
  const { users, isLoading: isLoadingUsers } = useUsers();
  
  const getAssigneeInfo = () => {
    if (!task.assigned_to) return { name: "Unassigned", initials: "?" };
    if (isLoadingUsers) return { name: "Loading...", initials: "..." };
    
    const user = users?.find(user => user.id === task.assigned_to);
    const name = user?.full_name || user?.email || "Unknown User";
    
    // Generate initials from name
    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    
    return { name, initials };
  };

  const getCreatorInfo = () => {
    if (!task.created_by) return "Unknown";
    if (isLoadingUsers) return "Loading...";
    
    const user = users?.find(user => user.id === task.created_by);
    return user?.full_name || user?.email || "Unknown User";
  };

  // Function to determine the badge variant based on priority
  const getPriorityVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "secondary";
    }
  };

  // Function to determine the badge variant based on status
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "default";
      case "in progress": return "secondary";
      case "to do": return "outline";
      default: return "outline";
    }
  };

  const assigneeInfo = getAssigneeInfo();
  const creatorInfo = getCreatorInfo();
  
  const formattedCreatedDate = task.created_at 
    ? format(new Date(task.created_at), "MMM d, yyyy 'at' h:mm a")
    : "Unknown";
    
  const formattedUpdatedDate = task.updated_at 
    ? format(new Date(task.updated_at), "MMM d, yyyy 'at' h:mm a")
    : "Unknown";

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={getStatusVariant(formattedTask.status)}>{formattedTask.status}</Badge>
            <Badge variant={getPriorityVariant(formattedTask.priority)}>Priority: {formattedTask.priority}</Badge>
            <Badge variant="outline">{formattedTask.project}</Badge>
          </div>
          <h1 className="text-3xl font-bold">{formattedTask.title}</h1>
        </div>
        
        <div className="flex gap-2">
          {isEditMode ? (
            <Button variant="outline" onClick={() => setIsEditMode(false)}>
              Cancel
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditMode(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="font-medium">Assignee:</span>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              {isLoadingUsers ? (
                <Skeleton className="h-6 w-6 rounded-full" />
              ) : (
                <>
                  <AvatarFallback>{assigneeInfo.initials}</AvatarFallback>
                </>
              )}
            </Avatar>
            <span>{assigneeInfo.name}</span>
          </div>
        </div>
        
        {task.deadline && (
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" />
            <span className="font-medium">Due:</span>
            <span>{formattedTask.dueDate}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="font-medium">Created:</span>
          <span>{formattedCreatedDate}</span>
          <span>by {creatorInfo}</span>
        </div>
        
        {task.updated_at && task.updated_at !== task.created_at && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Updated:</span>
            <span>{formattedUpdatedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskHeader;
