
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TaskFormValues } from "../TaskFormSchema";

interface TitleFieldProps {
  form: UseFormReturn<TaskFormValues>;
}

export const TitleField: React.FC<TitleFieldProps> = ({ form }) => (
  <FormField
    control={form.control}
    name="title"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Task Title</FormLabel>
        <FormControl>
          <Input placeholder="Enter task title" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
