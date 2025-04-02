
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import RelatedTaskCard from "./RelatedTaskCard";
import { Task } from "@/utils/tasks/types";

interface RelatedTasksListProps {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  onUnlink: (taskId: number) => void;
  onOpenLinkModal: () => void;
}

const RelatedTasksList: React.FC<RelatedTasksListProps> = ({
  tasks,
  isLoading,
  error,
  onUnlink,
  onOpenLinkModal
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-destructive mb-2">Failed to load related tasks</p>
        <Button variant="outline" size="sm" onClick={onOpenLinkModal}>Try Again</Button>
      </div>
    );
  }
  
  // Empty state
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p className="mb-4">No related tasks yet</p>
        <Button 
          className="text-primary hover:underline flex items-center" 
          variant="ghost"
          onClick={onOpenLinkModal}
        >
          <Plus className="mr-1 h-4 w-4" /> Link Task
        </Button>
      </div>
    );
  }
  
  // Tasks list
  return (
    <div>
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {tasks.map(task => (
          <RelatedTaskCard 
            key={task.id} 
            task={task} 
            onUnlink={onUnlink} 
          />
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onOpenLinkModal}
        >
          <Plus className="mr-1 h-4 w-4" /> Link Another Task
        </Button>
      </div>
    </div>
  );
};

export default RelatedTasksList;
