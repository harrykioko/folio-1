
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TaskFormValues } from "../TaskFormSchema";

interface DescriptionFieldProps {
  form: UseFormReturn<TaskFormValues>;
}

export const DescriptionField: React.FC<DescriptionFieldProps> = ({ form }) => (
  <FormField
    control={form.control}
    name="description"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea 
            placeholder="Enter task description" 
            className="min-h-32 resize-none" 
            {...field} 
          />
        </FormControl>
        <FormDescription>
          Provide a detailed description of the task.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);
