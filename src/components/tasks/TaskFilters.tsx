
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useProjects } from "@/hooks/useProjects";
import { useUsers } from "@/hooks/useUsers";

interface TaskFiltersProps {
  filters: {
    project: number | null;
    assignee: string | null;
    priority: string | null;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    project: number | null;
    assignee: string | null;
    priority: string | null;
  }>>;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, setFilters }) => {
  const { projects } = useProjects();
  const { users } = useUsers();

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project</label>
          <Select
            value={filters.project?.toString() || "all-projects"}
            onValueChange={(value) => setFilters({
              ...filters,
              project: value === "all-projects" ? null : parseInt(value, 10)
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-projects">All Projects</SelectItem>
              {projects?.map((project) => (
                <SelectItem key={project.id} value={project.id.toString()}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Assignee</label>
          <Select
            value={filters.assignee || "all-assignees"}
            onValueChange={(value) => setFilters({
              ...filters,
              assignee: value === "all-assignees" ? null : value
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Assignees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-assignees">All Assignees</SelectItem>
              {users?.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.full_name || user.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Priority</label>
          <Select
            value={filters.priority || "all-priorities"}
            onValueChange={(value) => setFilters({
              ...filters,
              priority: value === "all-priorities" ? null : value
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-priorities">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskFilters;
