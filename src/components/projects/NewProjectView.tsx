
import React, { useState } from "react";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

interface NewProjectViewProps {
  onSubmit: (data: ProjectFormValues) => Promise<void>;
}

const NewProjectView: React.FC<NewProjectViewProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  console.log("Rendering NewProjectView component");
  
  const handleSubmit = async (data: ProjectFormValues) => {
    console.log("NewProjectView - handling form submit:", data);
    
    if (isSubmitting) {
      console.log("Submission already in progress, skipping");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      toast.success("Project created successfully");
    } catch (error) {
      console.error("Error in NewProjectView submission:", error);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
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
      <ProjectForm 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default NewProjectView;
