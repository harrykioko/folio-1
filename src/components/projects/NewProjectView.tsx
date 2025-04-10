
import React, { useState } from "react";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface NewProjectViewProps {
  onSubmit: (data: ProjectFormValues) => Promise<void>;
}

const NewProjectView: React.FC<NewProjectViewProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  console.log("Rendering NewProjectView component");
  
  const handleSubmit = async (data: ProjectFormValues) => {
    console.log("NewProjectView - handling form submit:", data);
    
    if (isSubmitting) {
      console.log("Submission already in progress, skipping");
      return;
    }
    
    // Clear any previous errors
    setFormError(null);
    
    try {
      setIsSubmitting(true);
      
      // Log submission data for debugging
      console.log("Form submission data:", {
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        dueDate: data.dueDate,
        status: data.status
      });
      
      await onSubmit(data);
      console.log("Project creation succeeded");
      toast.success("Project created successfully");
      
      // Navigate after a slight delay to ensure toast visibility
      setTimeout(() => {
        navigate("/projects");
      }, 500);
    } catch (error) {
      console.error("Error in NewProjectView submission:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      console.error("Detailed error:", errorMessage);
      setFormError(errorMessage);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6 flex flex-col gap-2">
        <div>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/projects")} 
            size="sm"
            className="p-0 mr-2 h-auto mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="text-sm">Back to Projects</span>
          </Button>
        </div>
        <h1 className="text-3xl font-bold">Create New Project</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to create a new project.
        </p>
      </div>
      
      {formError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      
      <ProjectForm 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default NewProjectView;
