
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";

// Import project components
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectTabs from "@/components/projects/ProjectTabs";
import DeleteProjectDialog from "@/components/projects/DeleteProjectDialog";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";

// Import utility function
import { getProjectById } from "@/utils/projectUtils";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  console.log("Current projectId param:", projectId); // Debugging log
  
  const isNewProject = projectId === "new";
  
  // Safely find the project in our dummy data
  const project = isNewProject ? null : getProjectById(projectId);
  
  // Check if this is a new project or if the project was not found
  useEffect(() => {
    // Only redirect if it's NOT a new project AND project is not found
    if (!project && !isNewProject) {
      console.log("Project not found, projectId:", projectId);
      navigate("/projects");
      toast.error("Project not found");
    }
  }, [project, isNewProject, navigate, projectId]);

  const handleSubmit = (data: ProjectFormValues) => {
    if (isNewProject) {
      console.log("New project data:", data);
      // In a real app, we would save this to the database
      toast.success("Project created successfully!");
      navigate("/projects");
    } else {
      console.log("Updated project data:", data);
      // In a real app, we would update this in the database
      toast.success("Project updated successfully!");
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteProject = () => {
    // In a real app, we would delete from the database
    toast.success("Project deleted successfully!");
    navigate("/projects");
  };

  // Handle the case when we're creating a new project
  if (isNewProject) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-muted-foreground mt-2">
            Fill out the form below to create a new project.
          </p>
        </div>
        <ProjectForm onSubmit={handleSubmit} />
      </div>
    );
  }

  // If project is not found and we're not creating a new one, return null
  // The useEffect above will handle redirecting
  if (!project) {
    return null;
  }

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
