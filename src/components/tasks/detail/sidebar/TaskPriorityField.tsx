
import React from "react";
import { Task } from "@/utils/tasks/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface TaskPriorityFieldProps {
  task: Task;
  onPriorityChange: (value: string) => Promise<void>;
  isUpdating: boolean;
}

const TaskPriorityField: React.FC<TaskPriorityFieldProps> = ({ 
  task, 
  onPriorityChange, 
  isUpdating 
}) => {
  const handleChange = async (value: string) => {
    try {
      await onPriorityChange(value);
      toast.success(`Priority updated to ${value}`);
    } catch (error) {
      // Error handling is already managed in updateTask
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Priority</label>
      <Select 
        value={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} 
        onValueChange={handleChange}
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
  );
};

export default TaskPriorityField;
