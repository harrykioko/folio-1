
import React from "react";
import { Task } from "@/utils/tasks/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface TaskStatusFieldProps {
  task: Task;
  onStatusChange: (status: "todo" | "in_progress" | "completed") => Promise<void>;
  isUpdating: boolean;
}

const TaskStatusField: React.FC<TaskStatusFieldProps> = ({ 
  task, 
  onStatusChange, 
  isUpdating 
}) => {
  const handleChange = async (value: "todo" | "in_progress" | "completed") => {
    try {
      await onStatusChange(value);
      toast.success(`Status updated to ${getStatusTitle(value)}`);
    } catch (error) {
      // Error handling is already managed in updateTask
    }
  };
  
  const getStatusTitle = (status: string): string => {
    switch (status) {
      case "todo": return "To Do";
      case "in_progress": return "In Progress";
      case "completed": return "Completed";
      default: return status;
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Status</label>
      <Select 
        defaultValue={task.status} 
        value={task.status}
        onValueChange={value => handleChange(value as "todo" | "in_progress" | "completed")}
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
