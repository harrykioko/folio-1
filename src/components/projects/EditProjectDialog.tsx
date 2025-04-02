
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import ProjectForm from "@/components/projects/ProjectForm";
import { Project } from "@/utils/projects";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";

interface EditProjectDialogProps {
  project: Project;
  onClose: () => void;
  onSubmit: (data: ProjectFormValues) => Promise<void>;
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({
  project,
  onClose,
  onSubmit
}) => {
  // Convert the project data to form values
  const defaultValues: Partial<ProjectFormValues> = {
    name: project.name,
    description: project.description || "",
    status: project.status,
    // You would need to add other fields from your actual data
    startDate: "", // These would need to be populated from your actual data
    dueDate: "",
    githubRepo: "",
    domains: "",
    twitter: "",
    instagram: "",
    linkedin: ""
  };

  return (
    <>
      <CardTitle className="text-xl mb-2">Edit Project</CardTitle>
      <CardDescription className="mb-4">
        Update your project details.
      </CardDescription>
      
      <ProjectForm 
        defaultValues={defaultValues}
        isEditing={true}
        projectId={project.id}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default EditProjectDialog;
