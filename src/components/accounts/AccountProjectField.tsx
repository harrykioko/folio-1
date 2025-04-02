
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { AccountFormValues } from "@/schemas/accountSchema";
import { projects } from "@/utils/projectData";

interface AccountProjectFieldProps {
  control: Control<AccountFormValues>;
}

const AccountProjectField: React.FC<AccountProjectFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="projectId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Associated Project</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a project (optional)" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {projects.map(project => (
                <SelectItem key={project.id.toString()} value={project.id.toString()}>
                  {project.name}
                </SelectItem>
              ))}
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
