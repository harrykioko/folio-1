
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { AccountFormValues } from "@/schemas/accountSchema";
import { useProjects } from "@/hooks/useProjects";
import { Loader2 } from "lucide-react";

interface AccountProjectFieldProps {
  control: Control<AccountFormValues>;
}

const AccountProjectField: React.FC<AccountProjectFieldProps> = ({ control }) => {
  const { projects, isLoading, error } = useProjects();

  return (
    <FormField
      control={control}
      name="projectId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Associated Project</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || ""}
          >
            <FormControl>
              <SelectTrigger>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading projects...</span>
                  </div>
                ) : (
                  <SelectValue placeholder="Select a project (optional)" />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {projects && projects.map(project => (
                <SelectItem key={project.id.toString()} value={project.id.toString()}>
                  {project.name}
                </SelectItem>
              ))}
              {error && <SelectItem value="error" disabled>Error loading projects</SelectItem>}
            </SelectContent>
          </Select>
          <FormDescription>
            Link this account to a specific project
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AccountProjectField;
