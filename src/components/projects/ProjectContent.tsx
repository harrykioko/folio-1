
import React, { useState } from "react";
import ProjectDialogManager from "@/components/projects/ProjectDialogManager";
import ProjectTabs from "@/components/projects/ProjectTabs";
import { Project } from "@/utils/supabaseProjects";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";

interface ProjectContentProps {
  project: Project;
  onUpdate: (data: ProjectFormValues) => Promise<void>;
  onDelete: () => Promise<void>;
}

const ProjectContent: React.FC<ProjectContentProps> = ({
  project,
  onUpdate,
  onDelete
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
      
      <ProjectTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        project={project}
      />
    </div>
  );
};

export default ProjectContent;
