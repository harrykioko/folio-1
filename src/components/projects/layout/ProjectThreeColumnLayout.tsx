
import React from "react";
import { Project } from "@/utils/projects";
import ProjectLeftPanel from "./ProjectLeftPanel";
import ProjectMainPanel from "./ProjectMainPanel";
import ProjectRightPanel from "./ProjectRightPanel";

interface ProjectThreeColumnLayoutProps {
  project: Project;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
}

const ProjectThreeColumnLayout: React.FC<ProjectThreeColumnLayoutProps> = ({
  project,
  activeTab,
  setActiveTab,
  setIsEditDialogOpen,
  setIsDeleteDialogOpen
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Panel: Timeline, Progress, Tasks */}
      <div className="lg:col-span-3">
        <ProjectLeftPanel project={project} />
      </div>
      
      {/* Main Content Panel: Tabs */}
      <div className="lg:col-span-6">
        <ProjectMainPanel 
          project={project}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsEditDialogOpen={setIsEditDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        />
      </div>
      
      {/* Right Panel: Team and Resources */}
      <div className="lg:col-span-3">
        <ProjectRightPanel project={project} />
      </div>
    </div>
  );
};

export default ProjectThreeColumnLayout;
