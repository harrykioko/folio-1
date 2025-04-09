
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "./ProjectFormSchema";

interface ProjectBasicInfoFieldsProps {
  form: UseFormReturn<ProjectFormValues>;
}

const ProjectBasicInfoFields: React.FC<ProjectBasicInfoFieldsProps> = ({ form }) => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="project-name">Project Name*</FormLabel>
              <FormControl>
                <Input id="project-name" placeholder="Enter project name" {...field} name="name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="project-start-date">Start Date*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="project-start-date"
                      className="pl-9" 
                      type="date" 
                      {...field} 
                      name="startDate" 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="project-due-date">Due Date*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="project-due-date"
                      className="pl-9" 
                      type="date" 
                      {...field} 
                      name="dueDate" 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="project-description">Description*</FormLabel>
            <FormControl>
              <Textarea 
                id="project-description"
                placeholder="Describe the project and its goals"
                className="min-h-[120px]" 
                {...field} 
                name="description"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ProjectBasicInfoFields;
