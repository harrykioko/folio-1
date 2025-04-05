
import React from "react";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface NewProjectViewProps {
  onSubmit: (data: ProjectFormValues) => Promise<void>;
}

const NewProjectView: React.FC<NewProjectViewProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  
  console.log("Rendering NewProjectView component");
  
  const handleSubmit = async (data: ProjectFormValues) => {
    console.log("NewProjectView - handling form submit:", data);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error in NewProjectView submission:", error);
      // Error will be handled by the form component
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
      <ProjectForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewProjectView;
