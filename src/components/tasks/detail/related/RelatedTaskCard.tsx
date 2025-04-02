
import React from "react";
import { Unlink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTaskStatus } from "@/utils/tasks";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Task } from "@/utils/tasks/types";
import { useUsers } from "@/hooks/useUsers";
import { useProjects } from "@/hooks/useProjects";

interface RelatedTaskCardProps {
  task: Task;
  onUnlink: (taskId: number) => void;
}

const RelatedTaskCard: React.FC<RelatedTaskCardProps> = ({ task, onUnlink }) => {
  const { users } = useUsers();
  const { projects } = useProjects();
  
  // Get assignee information if available
  const assignee = task.assigned_to 
    ? users?.find(user => user.id === task.assigned_to) 
    : null;
  
  // Get project information if available
  const project = task.project_id 
    ? projects?.find(p => p.id === task.project_id) 
    : null;
  
  // Format status for display
  const status = formatTaskStatus(task.status);
  
  // Determine status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'to do': return 'bg-gray-200 text-gray-800';
      case 'in progress': return 'bg-blue-200 text-blue-800';
      case 'completed': return 'bg-green-200 text-green-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="p-3 border rounded-md mb-2 group relative hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="font-medium text-sm truncate mb-1">{task.title}</p>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4">
              <div className="space-y-2">
                <h4 className="font-medium text-base">{task.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {task.description || "No description provided."}
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onUnlink(task.id)}
          title="Unlink task"
        >
          <Unlink className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-2">
          {assignee && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={assignee.avatar_url || ''} alt={assignee.full_name || 'User'} />
              <AvatarFallback className="text-xs">
                {assignee.full_name ? getInitials(assignee.full_name) : 'U'}
              </AvatarFallback>
            </Avatar>
          )}
          
          <Badge className={`text-xs ${getStatusColor(status)}`}>{status}</Badge>
          
          {project && (
            <span className="text-xs text-muted-foreground truncate max-w-[100px]">
              {project.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedTaskCard;
