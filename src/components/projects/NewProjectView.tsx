
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProjectForm, { ProjectFormValues } from "./ProjectForm";

const NewProjectView: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: ProjectFormValues) => {
    console.log("New project data:", data);
    // In a real app, we would save this to the database
    toast.success("Project created successfully!");
    navigate("/projects");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate("/projects")} className="mb-4">
          Back to Projects
        </Button>
        <h1 className="text-3xl font-bold">Create New Project</h1>
      </div>
      <ProjectForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewProjectView;
