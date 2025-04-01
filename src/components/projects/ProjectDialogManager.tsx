
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DeleteProjectDialog from "@/components/projects/DeleteProjectDialog";
import ProjectHeader from "@/components/projects/ProjectHeader";
import EditProjectDialog from "@/components/projects/EditProjectDialog";
import { Project } from "@/utils/supabaseProjects";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";

interface ProjectDialogManagerProps {
  project: Project;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (value: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (value: boolean) => void;
  onDelete: () => Promise<void>;
  onUpdate: (data: ProjectFormValues) => Promise<void>;
}

const ProjectDialogManager: React.FC<ProjectDialogManagerProps> = ({
  project,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  onDelete,
  onUpdate
}) => {
  return (
    <>
      <ProjectHeader 
        name={project.name}
        description={project.description || ""}
        status={project.status}
        projectId={project.id}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <EditProjectDialog 
            project={project} 
            onClose={() => setIsEditDialogOpen(false)}
            onSubmit={onUpdate}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DeleteProjectDialog 
            onClose={() => setIsDeleteDialogOpen(false)}
            onDelete={onDelete}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectDialogManager;
