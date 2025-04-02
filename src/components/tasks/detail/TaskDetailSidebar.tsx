
import React from "react";
import { Card } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Task } from "@/utils/tasks/types";
import { useTaskMutation } from "@/hooks/useTaskMutation";
import { 
  TaskStatusField, 
  TaskPriorityField, 
  TaskAssigneeField, 
  TaskProjectField, 
  TaskDueDateField 
} from "./sidebar";

interface TaskDetailSidebarProps {
  task: Task;
  formattedTask: {
    status: string;
    priority: string;
    project: string;
    projectId?: number | null;
    assignee?: string | null;
    dueDate?: string;
    created?: string;
  };
}

const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({ 
  task, 
  formattedTask 
}) => {
  const { updateTask, isUpdating } = useTaskMutation();
  
  // Status change handler
  const handleStatusChange = async (value: "todo" | "in_progress" | "completed"): Promise<void> => {
    await updateTask(task.id, { status: value });
  };
  
  // Priority change handler
  const handlePriorityChange = async (value: string): Promise<void> => {
    await updateTask(task.id, { priority: value.toLowerCase() as Task['priority'] });
  };
  
  // Project change handler
  const handleProjectChange = async (value: string): Promise<void> => {
    await updateTask(task.id, { project_id: value === "unassigned" ? null : Number(value) });
  };
  
  // Assignee change handler
  const handleAssigneeChange = async (value: string): Promise<void> => {
    await updateTask(task.id, { assigned_to: value === "unassigned" ? null : value });
  };
  
  // Due date change handler
  const handleDueDateChange = async (date: Date): Promise<void> => {
    await updateTask(task.id, { deadline: date.toISOString() });
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "No date set";
    return new Date(dateString).toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Details</h3>
      <div className="space-y-6">
        <TaskStatusField 
          task={task} 
          onStatusChange={handleStatusChange} 
          isUpdating={isUpdating} 
        />
        
        <TaskPriorityField 
          task={task} 
          onPriorityChange={handlePriorityChange} 
          isUpdating={isUpdating} 
        />
        
        <TaskAssigneeField 
          task={task} 
          onAssigneeChange={handleAssigneeChange} 
          isUpdating={isUpdating} 
        />
        
        <TaskProjectField 
          task={task} 
          onProjectChange={handleProjectChange} 
          isUpdating={isUpdating} 
        />
        
        <TaskDueDateField 
          task={task} 
          onDueDateChange={handleDueDateChange} 
          isUpdating={isUpdating} 
        />
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Created</label>
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(task.created_at)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskDetailSidebar;
