
import React from "react";
import { Task } from "@/utils/tasks/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface TaskStatusFieldProps {
  task: Task;
  onStatusChange: (value: string) => Promise<void>;
  isUpdating: boolean;
}

const TaskStatusField: React.FC<TaskStatusFieldProps> = ({ 
  task, 
  onStatusChange, 
  isUpdating 
}) => {
  const handleChange = async (value: string) => {
    try {
      await onStatusChange(value);
      toast.success(`Task status updated to ${value === 'todo' ? 'To Do' : value === 'in_progress' ? 'In Progress' : 'Completed'}`);
    } catch (error) {
      // Error handling is already managed in updateTask
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Status</label>
      <Select 
        value={task.status} 
        onValueChange={handleChange}
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
  );
};

export default TaskStatusField;
