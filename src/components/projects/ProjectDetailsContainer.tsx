
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchProjectById, updateProject, deleteProject, Project, createProject } from "@/utils/projects";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectModernLayout from "@/components/projects/layout/ProjectModernLayout";
import ProjectDetailLoading from "@/components/projects/ProjectDetailLoading";
import ProjectNotFound from "@/components/projects/ProjectNotFound";
import NewProjectView from "@/components/projects/NewProjectView";
import { toast } from "sonner";

const ProjectDetailsContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Improved detection of "new" project route
  const isNewProject = id === "new" || location.pathname === "/projects/new";
  
  // Extra debug logging to track the issue
  console.log("🔍 ProjectDetailsContainer - Initial Render:", { 
    id, 
    isNewProject, 
    pathname: location.pathname,
    currentPath: window.location.pathname 
  });
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleCreate = async (data: ProjectFormValues) => {
    console.log("Creating new project with data:", data);
    try {
      const newProject = await createProject(data);
      console.log("Project created successfully:", newProject);
      toast.success("Project created successfully");
      
      // Navigate to the new project's details page
      if (newProject && newProject.id) {
        navigate(`/projects/${newProject.id}`);
      } else {
        console.error("Created project is missing ID");
        toast.error("Project created but couldn't retrieve ID");
      }
    } catch (err) {
      console.error("Error creating project:", err);
      toast.error("Failed to create project");
      throw err; // Re-throw so the NewProjectView can handle it
    }
  };
  
  // CRITICAL: Check for "new" project route FIRST, before any param validation
  if (isNewProject) {
    console.log("✅ Rendering NewProjectView");
    return <NewProjectView onSubmit={handleCreate} />;
  }
  
  // ✅ Block premature renders before router is ready
  if (typeof id === "undefined") {
    console.log("Route param not yet available — skipping render");
    return null;
  }
  
  useEffect(() => {
    // For "new" projects, we don't need to fetch anything
    if (isNewProject) {
      console.log("New project page detected, skipping fetch");
      setLoading(false);
      setProject(null);
      setError(null);
      return;
    }
    
    // Skip fetch if no ID is provided
    if (!id) {
      console.log("No project ID provided");
      setLoading(false);
      setError(new Error("Invalid project ID: undefined"));
      return;
    }
    
    // Try to convert ID to number for existing projects
    const numericId = parseInt(id, 10);
    
    if (isNaN(numericId)) {
      console.log(`Invalid project ID (not a number): ${id}`);
      setLoading(false);
      setError(new Error(`Invalid project ID: ${id}`));
      return;
    }

    const fetchProject = async () => {
      try {
        console.log(`Fetching project with ID: ${numericId}`);
        setLoading(true);
        const fetchedProject = await fetchProjectById(numericId);
        console.log("Project fetched successfully:", fetchedProject);
        setProject(fetchedProject);
        setError(null);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err as Error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, isNewProject]);

  const handleUpdate = async (data: ProjectFormValues) => {
    if (!project) return;
    try {
      const updatedProject = await updateProject(project.id, data);
      setProject(updatedProject);
      toast.success("Project updated successfully");
    } catch (err) {
      console.error("Error updating project:", err);
      toast.error("Failed to update project");
    }
  };

  const handleDelete = async () => {
    if (!project) return;
    try {
      await deleteProject(project.id);
      toast.success("Project deleted successfully");
      navigate("/projects");
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Failed to delete project");
    }
  };

  // Log the current state before render decisions
  console.log("Render state:", { 
    isNewProject, 
    loading, 
    hasError: !!error, 
    errorMessage: error?.message,
    hasProject: !!project 
  });
  
  // Then handle loading state
  if (loading) {
    console.log("Rendering loading state");
    return <ProjectDetailLoading />;
  }
  
  // Handle error state
  if (error) {
    console.log("Rendering error state:", error.message);
    return <ProjectNotFound error={error.message} />;
  }
  
  // Handle case where project is not found but no explicit error
  if (!project) {
    console.log("Rendering not found state (no project loaded)");
    return <ProjectNotFound error="Project not found" />;
  }

  console.log("Rendering project details:", project.name);
  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <ProjectHeader
        name={project.name}
        description={project.description || ""}
        status={project.status}
        projectId={project.id}
        startDate={project.startDate || new Date().toISOString()}
        dueDate={project.dueDate || new Date().toISOString()}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      
      <ProjectModernLayout
        project={project}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </div>
  );
};

export default ProjectDetailsContainer;
