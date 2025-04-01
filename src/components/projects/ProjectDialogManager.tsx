
import React from "react";
import { Dialog } from "@/components/ui/dialog";
import DeleteProjectDialog from "@/components/projects/DeleteProjectDialog";
import ProjectHeader from "@/components/projects/ProjectHeader";
import { Project } from "@/utils/supabaseProjects";

interface ProjectDialogManagerProps {
  project: Project;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (value: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (value: boolean) => void;
  onDelete: () => Promise<void>;
}

const ProjectDialogManager: React.FC<ProjectDialogManagerProps> = ({
  project,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  onDelete
}) => {
  return (
    <>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <ProjectHeader 
            name={project.name}
            description={project.description || ""}
            status={project.status}
            projectId={project.id}
            setIsEditDialogOpen={setIsEditDialogOpen}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          />
          
          <DeleteProjectDialog 
            onClose={() => setIsDeleteDialogOpen(false)}
            onDelete={onDelete}
          />
        </Dialog>
      </Dialog>
    </>
  );
};

export default ProjectDialogManager;
