
import React from "react";
import { Task } from "@/utils/tasks/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

interface TaskDueDateFieldProps {
  task: Task;
  onDueDateChange: (date: Date | undefined) => Promise<void>;
  isUpdating: boolean;
}

const TaskDueDateField: React.FC<TaskDueDateFieldProps> = ({ 
  task, 
  onDueDateChange, 
  isUpdating 
}) => {
  const getDeadlineDate = () => {
    if (!task.deadline) return undefined;
    return new Date(task.deadline);
  };

  const handleChange = async (date: Date | undefined) => {
    try {
      await onDueDateChange(date);
      toast.success(date ? `Due date set to ${format(date, 'PPP')}` : "Due date removed");
    } catch (error) {
      // Error handling is already managed in updateTask
    }
  };

  return (
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
            onSelect={handleChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskDueDateField;
