import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskFormValues } from "../TaskFormSchema";
import { Project } from "@/utils/projects";

interface ProjectFieldProps {
  form: UseFormReturn<TaskFormValues>;
  projects: Project[];
  isLoading: boolean;
}

export const ProjectField: React.FC<ProjectFieldProps> = ({ form, projects, isLoading }) => (
  <FormField
    control={form.control}
    name="projectId"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Project</FormLabel>
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value || "none"}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="none">No project</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id.toString()}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);
