
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projects } from "@/utils/projectUtils";
import { TaskFormValues } from "./TaskFormSchema";

// Title Field Component
export const TitleField = ({ form }: { form: UseFormReturn<TaskFormValues> }) => (
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

// Description Field Component
export const DescriptionField = ({ form }: { form: UseFormReturn<TaskFormValues> }) => (
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

// Status Field Component
export const StatusField = ({ form }: { form: UseFormReturn<TaskFormValues> }) => (
  <FormField
    control={form.control}
    name="status"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Status</FormLabel>
        <Select 
          onValueChange={field.onChange} 
          defaultValue={field.value}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

// Priority Field Component
export const PriorityField = ({ form }: { form: UseFormReturn<TaskFormValues> }) => (
  <FormField
    control={form.control}
    name="priority"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Priority</FormLabel>
        <Select 
          onValueChange={field.onChange} 
          defaultValue={field.value}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

// Project Field Component
export const ProjectField = ({ form }: { form: UseFormReturn<TaskFormValues> }) => (
  <FormField
    control={form.control}
    name="projectId"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Project</FormLabel>
        <Select 
          onValueChange={field.onChange} 
          defaultValue={field.value}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id.toString()}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

// Assignee Field Component
export const AssigneeField = ({ form }: { form: UseFormReturn<TaskFormValues> }) => (
  <FormField
    control={form.control}
    name="assignee"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Assignee</FormLabel>
        <FormControl>
          <Input placeholder="Enter assignee name" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

// Due Date Field Component
export const DueDateField = ({ form }: { form: UseFormReturn<TaskFormValues> }) => (
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
