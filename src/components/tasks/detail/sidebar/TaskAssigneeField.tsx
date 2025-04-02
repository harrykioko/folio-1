
import React from "react";
import { Task } from "@/utils/tasks/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/useUsers";
import { toast } from "sonner";

interface TaskAssigneeFieldProps {
  task: Task;
  onAssigneeChange: (value: string) => Promise<void>;
  isUpdating: boolean;
}

const TaskAssigneeField: React.FC<TaskAssigneeFieldProps> = ({ 
  task, 
  onAssigneeChange, 
  isUpdating 
}) => {
  const { users, isLoading: isLoadingUsers } = useUsers();

  const handleChange = async (value: string) => {
    try {
      await onAssigneeChange(value);
      const assigneeName = value === "unassigned" 
        ? "Unassigned" 
        : users?.find(user => user.id === value)?.full_name || "selected user";
      toast.success(`Task assigned to ${assigneeName}`);
    } catch (error) {
      // Error handling is already managed in updateTask
    }
  };

  if (isLoadingUsers) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Assignee</label>
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Assignee</label>
      <Select 
        value={task.assigned_to || "unassigned"} 
        onValueChange={handleChange}
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
    </div>
  );
};

export default TaskAssigneeField;
