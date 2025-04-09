
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GithubIcon, Globe } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "./ProjectFormSchema";

interface ProjectTechnicalFieldsProps {
  form: UseFormReturn<ProjectFormValues>;
}

const ProjectTechnicalFields: React.FC<ProjectTechnicalFieldsProps> = ({ form }) => {
  return (
    <>
      <h3 className="font-medium text-base">Technical Resources</h3>
      
      <FormField
        control={form.control}
        name="githubRepo"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="project-github-repo" className="flex items-center gap-2">
              <GithubIcon className="h-4 w-4" /> GitHub Repository
            </FormLabel>
            <FormControl>
              <Input 
                id="project-github-repo" 
                placeholder="https://github.com/username/repo" 
                {...field} 
                name="githubRepo"
              />
            </FormControl>
            <FormDescription>Link to the project's GitHub repository</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="domains"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="project-domains" className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> Domains
            </FormLabel>
            <FormControl>
              <Textarea 
                id="project-domains"
                placeholder="Enter domains, one per line (e.g., example.com)"
                className="min-h-[80px]" 
                {...field}
                name="domains"
              />
            </FormControl>
            <FormDescription>Enter each domain on a new line</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ProjectTechnicalFields;
