
import React from "react";
import { Task } from "@/utils/tasks/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "sonner";

interface TaskProjectFieldProps {
  task: Task;
  onProjectChange: (value: string) => Promise<void>;
  isUpdating: boolean;
}

const TaskProjectField: React.FC<TaskProjectFieldProps> = ({ 
  task, 
  onProjectChange, 
  isUpdating 
}) => {
  const { projects, isLoading: isLoadingProjects } = useProjects();

  const handleChange = async (value: string) => {
    try {
      await onProjectChange(value);
      const projectName = value === "none" 
        ? "No Project" 
        : projects?.find(project => project.id.toString() === value)?.name || "selected project";
      toast.success(`Task moved to ${projectName}`);
    } catch (error) {
      // Error handling is already managed in updateTask
    }
  };

  if (isLoadingProjects) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Project</label>
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Project</label>
      <Select 
        value={task.project_id?.toString() || "none"} 
        onValueChange={handleChange}
        disabled={isUpdating}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No Project</SelectItem>
          {projects?.map(project => (
            <SelectItem key={project.id} value={project.id.toString()}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaskProjectField;
