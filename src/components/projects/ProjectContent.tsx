
import React, { useState } from "react";
import ProjectDialogManager from "@/components/projects/ProjectDialogManager";
import { Project } from "@/utils/supabaseProjects";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";
import ProjectThreeColumnLayout from "@/components/projects/layout/ProjectThreeColumnLayout";

interface ProjectContentProps {
  project: Project;
  onUpdate: (data: ProjectFormValues) => Promise<void>;
  onDelete: () => Promise<void>;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
}

const ProjectContent: React.FC<ProjectContentProps> = ({
  project,
  onUpdate,
  onDelete,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6 animate-fade-in">
      <ProjectDialogManager
        project={project}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
      
      <ProjectThreeColumnLayout 
        project={project}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </div>
  );
};

export default ProjectContent;
