
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DeleteProjectDialog from "@/components/projects/DeleteProjectDialog";
import EditProjectDialog from "@/components/projects/EditProjectDialog";
import { Project } from "@/utils/projects";
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
        <DeleteProjectDialog 
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={onDelete}
        />
      </Dialog>
    </>
  );
};

export default ProjectDialogManager;
