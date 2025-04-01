
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Calendar, GithubIcon, Globe, Instagram, Linkedin, Twitter } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Project schema for form validation
const projectSchema = z.object({
  name: z.string().min(2, { message: "Project name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
  githubRepo: z.string().optional(),
  domains: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormValues>;
  isEditing?: boolean;
  onSubmit: (data: ProjectFormValues) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  defaultValues = {
    name: "",
    description: "",
    startDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    githubRepo: "",
    domains: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  },
  isEditing = false,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const handleSubmit = (data: ProjectFormValues) => {
    onSubmit(data);
    toast.success(isEditing ? "Project updated successfully" : "Project created successfully");
    navigate("/projects");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Project" : "Create New Project"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
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
                      <FormLabel>Start Date*</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" type="date" {...field} />
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
                      <FormLabel>Due Date*</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" type="date" {...field} />
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
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the project and its goals"
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />
            
            <h3 className="font-medium text-base">Technical Resources</h3>
            
            <FormField
              control={form.control}
              name="githubRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <GithubIcon className="h-4 w-4" /> GitHub Repository
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/username/repo" {...field} />
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
                  <FormLabel className="flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Domains
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter domains, one per line (e.g., example.com)"
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Enter each domain on a new line</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />
            
            <h3 className="font-medium text-base">Social Media</h3>
            
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" /> Twitter
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="@username" {...field} />
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
                    <FormLabel className="flex items-center gap-2">
                      <Instagram className="h-4 w-4" /> Instagram
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="@username" {...field} />
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
                    <FormLabel className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="linkedin.com/company/name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.formState.errors.root && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {form.formState.errors.root.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => navigate("/projects")}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Project" : "Create Project"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ProjectForm;
