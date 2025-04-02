
import React, { useState } from "react";
import { Project } from "@/utils/projects";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";
import ProjectDialogManager from "@/components/projects/ProjectDialogManager";
import ProjectMilestones from "@/components/projects/milestones/ProjectMilestones";
import ProjectMainContent from "@/components/projects/layout/ProjectMainContent";
import ProjectSidebar from "@/components/projects/layout/ProjectSidebar";

interface ProjectModernLayoutProps {
  project: Project;
  onUpdate: (data: ProjectFormValues) => Promise<void>;
  onDelete: () => Promise<void>;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
}

const ProjectModernLayout: React.FC<ProjectModernLayoutProps> = ({
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
      
      {/* Project Milestones */}
      <ProjectMilestones project={project} />
      
      {/* 65/35 Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Content (65%) */}
        <div className="lg:col-span-8">
          <ProjectMainContent 
            project={project}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        
        {/* Right Sidebar (35%) */}
        <div className="lg:col-span-4">
          <ProjectSidebar project={project} />
        </div>
      </div>
    </div>
  );
};

export default ProjectModernLayout;
