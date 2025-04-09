
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "./ProjectFormSchema";

interface ProjectSocialFieldsProps {
  form: UseFormReturn<ProjectFormValues>;
}

const ProjectSocialFields: React.FC<ProjectSocialFieldsProps> = ({ form }) => {
  return (
    <>
      <h3 className="font-medium text-base">Social Media</h3>
      
      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="project-twitter" className="flex items-center gap-2">
                <Twitter className="h-4 w-4" /> Twitter
              </FormLabel>
              <FormControl>
                <Input 
                  id="project-twitter"
                  placeholder="@username" 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="project-instagram" className="flex items-center gap-2">
                <Instagram className="h-4 w-4" /> Instagram
              </FormLabel>
              <FormControl>
                <Input 
                  id="project-instagram"
                  placeholder="@username" 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="project-linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </FormLabel>
              <FormControl>
                <Input 
                  id="project-linkedin"
                  placeholder="linkedin.com/company/name" 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default ProjectSocialFields;
