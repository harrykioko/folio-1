
import React from "react";
import { Task } from "@/utils/tasks/types";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface TaskDueDateFieldProps {
  task: Task;
  onDueDateChange: (date: Date) => Promise<void>;
  isUpdating: boolean;
}

const TaskDueDateField: React.FC<TaskDueDateFieldProps> = ({ 
  task, 
  onDueDateChange, 
  isUpdating 
}) => {
  const handleChange = async (date: Date) => {
    try {
      await onDueDateChange(date);
      toast.success(`Due date updated to ${format(date, 'PP')}`);
    } catch (error) {
      // Error handling is already managed in updateTask
    }
  };

  const dueDateObject = task.deadline ? new Date(task.deadline) : undefined;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Due Date</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
            disabled={isUpdating}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dueDateObject ? format(dueDateObject, 'PPP') : "No due date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dueDateObject}
            onSelect={(date) => date && handleChange(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskDueDateField;
