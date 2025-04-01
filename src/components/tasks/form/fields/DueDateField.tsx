
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TaskFormValues } from "../TaskFormSchema";

interface DueDateFieldProps {
  form: UseFormReturn<TaskFormValues>;
}

export const DueDateField: React.FC<DueDateFieldProps> = ({ form }) => (
  <FormField
    control={form.control}
    name="dueDate"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Due Date</FormLabel>
        <FormControl>
          <Input type="date" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
