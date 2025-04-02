
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import { useProjects } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/utils/tasks/types";
import { useTaskMutation } from "@/hooks/useTaskMutation";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskDetailSidebarProps {
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
}

const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({ task, formattedTask }) => {
  const { users, isLoading: isLoadingUsers } = useUsers();
  const { projects, isLoading: isLoadingProjects } = useProjects();
  const { updateTask, isUpdating } = useTaskMutation();

  const handleStatusChange = (value: string) => {
    updateTask(task.id, { status: value as 'todo' | 'in_progress' | 'completed' });
  };

  const handlePriorityChange = (value: string) => {
    updateTask(task.id, { priority: value.toLowerCase() as 'low' | 'medium' | 'high' | 'urgent' });
  };

  const handleAssigneeChange = (value: string) => {
    updateTask(task.id, { assigned_to: value === "unassigned" ? null : value });
  };

  const handleProjectChange = (value: string) => {
    updateTask(task.id, { project_id: value ? parseInt(value, 10) : null });
  };

  const handleDueDateChange = (date: Date | undefined) => {
    updateTask(task.id, { deadline: date ? date.toISOString() : null });
  };

  const getDeadlineDate = () => {
    if (!task.deadline) return undefined;
    return new Date(task.deadline);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Details</h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <Select 
            value={task.status} 
            onValueChange={handleStatusChange}
            disabled={isUpdating}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Priority</label>
          <Select 
            value={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} 
            onValueChange={handlePriorityChange}
            disabled={isUpdating}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Assignee</label>
          {isLoadingUsers ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select 
              value={task.assigned_to || "unassigned"} 
              onValueChange={handleAssigneeChange}
              disabled={isUpdating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {users?.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.full_name || user.email || "Unknown User"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Project</label>
          {isLoadingProjects ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select 
              value={task.project_id?.toString() || ""} 
              onValueChange={handleProjectChange}
              disabled={isUpdating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Project</SelectItem>
                {projects?.map(project => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Due Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !task.deadline && "text-muted-foreground"
                )}
                disabled={isUpdating}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {task.deadline ? format(new Date(task.deadline), "PPP") : "No due date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={getDeadlineDate()}
                onSelect={handleDueDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
};

export default TaskDetailSidebar;
