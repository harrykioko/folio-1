
import React from "react";
import { Card } from "@/components/ui/card";
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
  const { updateTask, isUpdating } = useTaskMutation();

  const handleStatusChange = async (value: string) => {
    return updateTask(task.id, { status: value as 'todo' | 'in_progress' | 'completed' });
  };

  const handlePriorityChange = async (value: string) => {
    return updateTask(task.id, { priority: value.toLowerCase() as 'low' | 'medium' | 'high' | 'urgent' });
  };

  const handleAssigneeChange = async (value: string) => {
    return updateTask(task.id, { assigned_to: value === "unassigned" ? null : value });
  };

  const handleProjectChange = async (value: string) => {
    return updateTask(task.id, { project_id: value === "none" ? null : parseInt(value, 10) });
  };

  const handleDueDateChange = async (date: Date | undefined) => {
    return updateTask(task.id, { deadline: date ? date.toISOString() : null });
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
      </div>
    </Card>
  );
};

export default TaskDetailSidebar;
