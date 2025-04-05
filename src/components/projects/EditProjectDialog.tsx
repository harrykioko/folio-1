
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import ProjectForm from "@/components/projects/ProjectForm";
import { Project } from "@/utils/projects";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";
import { format } from "date-fns";

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
  // Format dates from ISO to YYYY-MM-DD format for the date inputs
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), 'yyyy-MM-dd');
    } catch (e) {
      console.error("Invalid date format:", dateString, e);
      return "";
    }
  };

  // Convert the project data to form values
  const defaultValues: Partial<ProjectFormValues> = {
    name: project.name,
    description: project.description || "",
    status: project.status,
    startDate: formatDateForInput(project.startDate),
    dueDate: formatDateForInput(project.dueDate),
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
