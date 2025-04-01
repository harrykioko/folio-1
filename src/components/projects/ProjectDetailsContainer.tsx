
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { fetchProjectById, deleteProject, updateProject, Project } from "@/utils/supabaseProjects";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";
import ProjectDetailLoading from "@/components/projects/ProjectDetailLoading";
import ProjectNotFound from "@/components/projects/ProjectNotFound";
import NewProjectView from "@/components/projects/NewProjectView";
import ProjectContent from "@/components/projects/ProjectContent";

const ProjectDetailsContainer: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check if we're on the new project route
  const isNewProject = location.pathname === "/projects/new" || projectId === "new";
  
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

  const handleCreateProject = async (data: ProjectFormValues) => {
    console.log("New project data:", data);
    // Form submission is handled by the ProjectForm component
    // navigate is also handled there
  };

  const handleUpdateProject = async (data: ProjectFormValues) => {
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
      
      // Refresh project data
      const updatedProject = await fetchProjectById(project.id);
      setProject(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
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
    return <ProjectDetailLoading />;
  }

  // Handle the case when we're creating a new project
  if (isNewProject) {
    return <NewProjectView onSubmit={handleCreateProject} />;
  }

  // Handle error state
  if (error || !project) {
    return <ProjectNotFound error={error} />;
  }

  return (
    <ProjectContent 
      project={project}
      onUpdate={handleUpdateProject}
      onDelete={handleDeleteProject}
    />
  );
};

export default ProjectDetailsContainer;
