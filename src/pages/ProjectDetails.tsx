
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Import project components
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectTabs from "@/components/projects/ProjectTabs";
import DeleteProjectDialog from "@/components/projects/DeleteProjectDialog";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";

// Import Supabase utilities 
import { fetchProjectById, updateProject, deleteProject, Project } from "@/utils/supabaseProjects";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  console.log("Current projectId param:", projectId);
  console.log("Current path:", location.pathname);
  
  // Check if we're on the new project route
  const isNewProject = location.pathname === "/projects/new" || projectId === "new";
  
  console.log("Is new project:", isNewProject);
  
  // Fetch project data from Supabase
  useEffect(() => {
    const loadProject = async () => {
      // Don't fetch if we're creating a new project
      if (isNewProject) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const numericId = parseInt(projectId || "0", 10);
        if (isNaN(numericId) || numericId <= 0) {
          throw new Error("Invalid project ID");
        }
        
        const data = await fetchProjectById(numericId);
        setProject(data);
        setError(null);
      } catch (err) {
        console.error("Error loading project:", err);
        setError("Failed to load project. It may not exist or you don't have permission to view it.");
      } finally {
        setLoading(false);
      }
    };
    
    loadProject();
  }, [projectId, isNewProject]);

  const handleSubmit = async (data: ProjectFormValues) => {
    if (isNewProject) {
      console.log("New project data:", data);
      // Form submission is handled by the ProjectForm component
      // navigate is also handled there
    } else {
      try {
        // Format the data for Supabase
        const updatedData = {
          name: data.name,
          description: data.description,
          status: data.status
        };
        
        if (!project || !project.id) {
          throw new Error("Project ID is missing");
        }
        
        await updateProject(project.id, updatedData);
        toast.success("Project updated successfully!");
        setIsEditDialogOpen(false);
        
        // Refresh project data
        const updatedProject = await fetchProjectById(project.id);
        setProject(updatedProject);
      } catch (error) {
        console.error("Error updating project:", error);
        toast.error("Failed to update project");
      }
    }
  };

  const handleDeleteProject = async () => {
    try {
      if (!project || !project.id) {
        throw new Error("Project ID is missing");
      }
      
      await deleteProject(project.id);
      toast.success("Project deleted successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }

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

  // Handle error state
  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground mt-2">
            {error || "The requested project could not be found."}
          </p>
          <Button 
            onClick={() => navigate("/projects")}
            className="mt-4"
          >
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  // Map the project data to the form expected by our components
  const projectFormData: ProjectFormValues = {
    name: project.name,
    description: project.description || "",
    status: project.status,
    startDate: new Date().toISOString().split("T")[0], // Placeholder for now
    dueDate: new Date().toISOString().split("T")[0],   // Placeholder for now
    githubRepo: "",
    domains: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  };

  return (
    <div className="space-y-6 animate-fade-in">
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
