
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
  
  // STEP 4: Add debug logging
  console.log("Params:", { id });
  console.log("isNewProject:", isNewProject);
  console.log("numericId:", numericId);
  
  // STEP 2: Improve useEffect to prevent invalid fetch
  useEffect(() => {
    // If this is a new project or we have an invalid ID, don't fetch anything
    if (isNewProject || numericId === null || isNaN(numericId)) {
      console.log("Skipping fetch for new/invalid project:", { isNewProject, numericId });
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        console.log("Fetching project with ID:", numericId);
        setLoading(true);
        const fetchedProject = await fetchProjectById(numericId);
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
  }, [isNewProject, numericId]);

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
    try {
      // Ensure all required fields are present
      if (!data.name || !data.description) {
        toast.error("Project name and description are required");
        return;
      }
      
      const newProject = await createProject(data);
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
  console.log("Rendering decision:", { 
    isNewProject, 
    loading, 
    hasError: !!error,
    hasProject: !!project
  });

  // Loading state takes precedence
  if (loading) {
    console.log("Rendering loading state");
    return <ProjectDetailLoading />;
  }
  
  // Then check for new project before any other conditions
  if (isNewProject) {
    console.log("Rendering NewProjectView for new project");
    return <NewProjectView onSubmit={handleCreate} />;
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
