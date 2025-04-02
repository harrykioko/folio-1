
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Tag, CheckSquare } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Task } from "@/utils/tasks/types";
import { useProjects } from "@/hooks/useProjects";
import { Separator } from "@/components/ui/separator";

interface TaskCardProps {
  task: Task;
  getUserName: (userId: string | null) => string;
  isDragging?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, getUserName, isDragging = false }) => {
  const navigate = useNavigate();
  const { projects, isLoading: isLoadingProjects } = useProjects();
  
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent": return "bg-red-500/70 text-white";
      case "high": return "bg-orange-500/70 text-white";
      case "medium": return "bg-blue-500/70 text-white";
      case "low": return "bg-green-500/70 text-white";
      default: return "bg-slate-500/70 text-white";
    }
  };
  
  const getInitials = (name: string): string => {
    if (!name || name === "Unassigned" || name === "Unknown User") return "?";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getProjectName = (projectId: number | null) => {
    if (!projectId) return null;
    if (isLoadingProjects) return `P-${projectId}`;
    
    const project = projects?.find(p => p.id === projectId);
    return project ? project.name : `P-${projectId}`;
  };

  const assigneeName = getUserName(task.assigned_to);
  const projectName = getProjectName(task.project_id);

  const handleClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  // Get subtask count if any
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  const completedSubtasks = hasSubtasks 
    ? task.subtasks.filter(st => st.is_complete).length 
    : 0;
  const totalSubtasks = hasSubtasks ? task.subtasks.length : 0;

  return (
    <Card 
      className={`
        bg-white/10 dark:bg-black/10 backdrop-blur-md 
        border border-white/20 dark:border-white/5
        shadow-md rounded-xl p-4 
        transition-all duration-200 cursor-pointer
        hover:shadow-xl hover:translate-y-[-2px]
        ${isDragging ? 'ring-2 ring-primary' : ''}
      `}
      onClick={handleClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5 flex-1">
            <h3 className="font-medium line-clamp-2 pr-1">{task.title}</h3>
            {task.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className={`shrink-0 ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase()}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Add subtle separator */}
        <Separator className="bg-border/50" />
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px] bg-primary/10">
                      {getInitials(assigneeName)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Assigned to: {assigneeName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center gap-2">
            {hasSubtasks && (
              <div className="flex items-center gap-1">
                <CheckSquare className="h-3 w-3" />
                <span>{completedSubtasks}/{totalSubtasks}</span>
              </div>
            )}
            
            {task.deadline && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Due date: {new Date(task.deadline).toLocaleDateString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {projectName && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      <span className="max-w-[80px] truncate">{projectName}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Project: {projectName}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
