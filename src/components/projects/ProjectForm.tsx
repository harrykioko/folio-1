
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Import our extracted components and schemas
import ProjectBasicInfoFields from "./form/ProjectBasicInfoFields";
import ProjectTechnicalFields from "./form/ProjectTechnicalFields";
import ProjectSocialFields from "./form/ProjectSocialFields";
import { projectSchema, ProjectFormValues, getDefaultValues } from "./form/ProjectFormSchema";

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormValues>;
  isEditing?: boolean;
  projectId?: number;
  onSubmit?: (data: ProjectFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  defaultValues = getDefaultValues(),
  isEditing = false,
  projectId,
  onSubmit,
  isSubmitting = false,
}) => {
  const navigate = useNavigate();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
    mode: "onChange" // Enable validation on change for better user experience
  });

  console.log("ProjectForm rendered with defaultValues:", defaultValues);

  const handleSubmit = async (data: ProjectFormValues) => {
    console.log("Form submitted with data:", data);
    
    if (isSubmitting) {
      console.log("Submission already in progress, skipping form handler");
      return;
    }
    
    try {
      if (onSubmit) {
        console.log("Calling provided onSubmit handler");
        await onSubmit(data);
      } else {
        // If no onSubmit provided, we should navigate back - this shouldn't happen
        // but provides a fallback
        console.error("No form submission handler provided");
        toast.error("Form submission handler not provided");
        navigate("/projects");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Error handling is now done in the parent component
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
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                isEditing ? "Update Project" : "Create Project"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ProjectForm;
