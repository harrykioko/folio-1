
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskFormValues } from "../TaskFormSchema";
import { User } from "@/hooks/useUsers";

interface AssigneeFieldProps {
  form: UseFormReturn<TaskFormValues>;
  users: User[];
  isLoading: boolean;
}

export const AssigneeField: React.FC<AssigneeFieldProps> = ({ form, users, isLoading }) => (
  <FormField
    control={form.control}
    name="assignee"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Assignee</FormLabel>
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem key="unassigned" value="unassigned">Unassigned</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.full_name || user.email || user.id}
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
