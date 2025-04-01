
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Edit, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
          {assignee && <span>Assigned to: {assignee}</span>}
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
            <Dialog open={false} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete the task and remove it from the system.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={() => {}}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskHeader;
