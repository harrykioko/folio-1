
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProjectById, updateProject, deleteProject, Project } from "@/utils/supabaseProjects";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectModernLayout from "@/components/projects/layout/ProjectModernLayout";
import ProjectDetailLoading from "@/components/projects/ProjectDetailLoading";
import ProjectNotFound from "@/components/projects/ProjectNotFound";
import NewProjectView from "@/components/projects/NewProjectView";
import { createProject } from "@/utils/supabaseProjects";
import { toast } from "sonner";

const ProjectDetailsContainer: React.FC = () => {
  // STEP 1: Standardize param extraction
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Determine whether this is a new project or an existing one
  const isNewProject = id === "new";
  const numericId = !isNewProject ? parseInt(id || "", 10) : null;
  
  // Enhanced debug logging
  console.log("ProjectDetailsContainer rendering with params:", { 
    id, 
    isNewProject, 
    numericId, 
    currentUrl: window.location.pathname 
  });
  
  // STEP 2: Improve useEffect to prevent invalid fetch
  useEffect(() => {
    // CRITICAL: Check for "new" first, before any other logic
    if (isNewProject) {
      console.log("New project view detected, skipping fetch and setting loading=false");
      setLoading(false);
      setError(null); // Clear any previous errors
      setProject(null); // Clear any previous project
      return;
    }
    
    // If we have an invalid ID, don't fetch anything
    if (numericId === null || isNaN(numericId)) {
      console.log("Invalid project ID detected:", { id, numericId });
      setLoading(false);
      setError(new Error(`Invalid project ID: ${id}`));
      return;
    }

    const fetchProject = async () => {
      try {
        console.log("Fetching project with ID:", numericId);
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
  }, [isNewProject, numericId, id]);

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

  const handleCreate = async (data: ProjectFormValues) => {
    console.log("Creating new project with data:", data);
    try {
      // Ensure all required fields are present
      if (!data.name || !data.description) {
        toast.error("Project name and description are required");
        return;
      }
      
      const newProject = await createProject(data);
      console.log("Project created successfully:", newProject);
      toast.success("Project created successfully");
      
      // Verify we got a valid ID back before navigating
      if (newProject && newProject.id) {
        navigate(`/projects/${newProject.id}`);
      } else {
        console.error("Created project is missing ID");
        toast.error("Project created but couldn't retrieve ID");
      }
    } catch (err) {
      console.error("Error creating project:", err);
      toast.error("Failed to create project");
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

  // STEP 3: Reorder conditional rendering to prevent premature fallback
  // IMPORTANT: Log the state before making render decisions
  console.log("Render decision state:", { 
    isNewProject, 
    loading, 
    hasError: !!error,
    errorMessage: error?.message,
    hasProject: !!project,
    currentUrl: window.location.href
  });

  // NEW PROJECT CHECK MUST COME FIRST - before loading check
  if (isNewProject) {
    console.log("✅ Rendering NewProjectView for new project");
    return <NewProjectView onSubmit={handleCreate} />;
  }
  
  // Then handle loading state
  if (loading) {
    console.log("Rendering loading state");
    return <ProjectDetailLoading />;
  }
  
  // Then handle error state
  if (error) {
    console.log("Rendering ProjectNotFound due to error:", error.message);
    return <ProjectNotFound error={error.message} />;
  }
  
  // Finally, check if we have a valid project
  if (!project || !project.id) {
    console.log("Rendering ProjectNotFound because no valid project found");
    return <ProjectNotFound error="Project not found or invalid project data" />;
  }

  console.log("Rendering full project view for:", project.name);
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
