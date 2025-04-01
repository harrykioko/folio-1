
import React from "react";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";

interface NewProjectViewProps {
  onSubmit: (data: ProjectFormValues) => Promise<void>;
}

const NewProjectView: React.FC<NewProjectViewProps> = ({ onSubmit }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Project</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to create a new project.
        </p>
      </div>
      <ProjectForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewProjectView;
