import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { createProject, updateProject } from "@/utils/supabaseProjects";

// Import our extracted components and schemas
import ProjectBasicInfoFields from "./form/ProjectBasicInfoFields";
import ProjectTechnicalFields from "./form/ProjectTechnicalFields";
import ProjectSocialFields from "./form/ProjectSocialFields";
import { projectSchema, ProjectFormValues, getDefaultValues } from "./form/ProjectFormSchema";

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormValues>;
  isEditing?: boolean;
  projectId?: number;
  onSubmit?: (data: ProjectFormValues) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  defaultValues = getDefaultValues(),
  isEditing = false,
  projectId,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
    mode: "onChange" // Enable validation on change for better user experience
  });

  const handleSubmit = async (data: ProjectFormValues) => {
    try {
      if (onSubmit) {
        onSubmit(data);
        return;
      }

      // Map form data to the structure expected by Supabase
      const projectData = {
        name: data.name,
        description: data.description,
        status: data.status,
        // Other fields can be stored as JSON in the description or in separate tables
      };

      if (isEditing && projectId) {
        await updateProject(projectId, projectData);
        toast.success("Project updated successfully");
      } else {
        await createProject(projectData);
        toast.success("Project created successfully");
      }
      
      navigate("/projects");
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Project" : "Create New Project"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProjectBasicInfoFields form={form} />
            
            <Separator />
            
            <ProjectTechnicalFields form={form} />
            
            <Separator />
            
            <ProjectSocialFields form={form} />

            {form.formState.errors.root && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {form.formState.errors.root.message}
                </AlertDescription>
              </Alert>
            )}
            
            {/* Display the date validation error if it exists */}
            {form.formState.errors.dueDate?.message && form.formState.errors.dueDate.type === "custom" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {form.formState.errors.dueDate.message}
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
