
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";

// Import project components
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectTabs from "@/components/projects/ProjectTabs";
import DeleteProjectDialog from "@/components/projects/DeleteProjectDialog";
import NewProjectView from "@/components/projects/NewProjectView";
import { ProjectFormValues } from "@/components/projects/ProjectForm";

// Import utility function
import { getProjectById } from "@/utils/projectUtils";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  const isNewProject = projectId === "new";
  
  // Safely find the project in our dummy data
  const project = isNewProject ? null : getProjectById(projectId);
  
  // Check if this is a new project or if the project was not found
  useEffect(() => {
    // Only redirect if it's NOT a new project AND project is not found
    if (!project && !isNewProject) {
      navigate("/projects");
      toast.error("Project not found");
    }
  }, [project, isNewProject, navigate]);

  // Handle the case when we're creating a new project
  if (isNewProject) {
    return <NewProjectView />;
  }

  // If project is not found and we're not creating a new one, return null
  // The useEffect above will handle redirecting
  if (!project) {
    return null;
  }

  const handleEditSubmit = (data: ProjectFormValues) => {
    console.log("Updated project data:", data);
    // In a real app, we would update this in the database
    toast.success("Project updated successfully!");
    setIsEditDialogOpen(false);
  };

  const handleDeleteProject = () => {
    // In a real app, we would delete from the database
    toast.success("Project deleted successfully!");
    navigate("/projects");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <ProjectHeader 
            name={project.name}
            description={project.description}
            status={project.status}
            setIsEditDialogOpen={setIsEditDialogOpen}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          />
          
          <DeleteProjectDialog 
            onClose={() => setIsDeleteDialogOpen(false)}
            onDelete={handleDeleteProject}
          />
        </Dialog>
      </Dialog>
      
      <ProjectTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        project={project}
      />
    </div>
  );
};

export default ProjectDetails;
