
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Edit, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUsers } from "@/hooks/useUsers";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskHeaderProps {
  title: string;
  status: string;
  priority: string;
  project: string;
  assignee?: string;
  dueDate?: string;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  setIsDeleteDialogOpen: (value: boolean) => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({
  title,
  status,
  priority,
  project,
  assignee,
  dueDate,
  isEditMode,
  setIsEditMode,
  setIsDeleteDialogOpen,
}) => {
  const { users, isLoading: isLoadingUsers } = useUsers();
  
  const getAssigneeName = () => {
    if (!assignee) return null;
    if (isLoadingUsers) return <Skeleton className="h-4 w-24 inline-block" />;
    
    const user = users?.find(user => user.id === assignee);
    return user?.full_name || user?.email || "Unknown User";
  };

  // Function to determine the badge variant based on priority
  const getPriorityVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "destructive";
      case "high":
        return "default";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "secondary";
    }
  };

  // Function to determine the badge variant based on status
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "default";
      case "in progress":
        return "secondary";
      case "to do":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-start md:space-y-0">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={getStatusVariant(status)}>{status}</Badge>
          <Badge variant={getPriorityVariant(priority)}>Priority: {priority}</Badge>
          <Badge variant="outline">{project}</Badge>
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          {assignee && (
            <span>Assigned to: {getAssigneeName()}</span>
          )}
          {dueDate && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <CalendarClock className="h-4 w-4" />
                <span>Due: {dueDate}</span>
              </div>
            </>
          )}
        </div>
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
  );
};

export default TaskHeader;
