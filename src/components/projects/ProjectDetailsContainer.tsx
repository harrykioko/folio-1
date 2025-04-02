
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
  const { id, projectId } = useParams<{ id?: string; projectId?: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const effectiveId = id || projectId;
  const isNewProject = effectiveId === "new";

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        
        // For new projects, just set loading to false and return early
        // This prevents trying to fetch a non-existent project
        if (isNewProject) {
          setLoading(false);
          return;
        }
        
        // Only fetch if we have a valid ID that's not "new"
        if (!effectiveId) {
          console.warn("No project ID provided");
          setError(new Error("No project ID provided"));
          setLoading(false);
          return;
        }
        
        const fetchedProject = await fetchProjectById(effectiveId);
        setProject(fetchedProject);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [effectiveId]); // Remove isNewProject from dependencies to prevent re-renders

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

  if (loading) return <ProjectDetailLoading />;
  
  if (isNewProject) {
    return <NewProjectView onSubmit={handleCreate} />;
  }
  
  if (error || !project) {
    return <ProjectNotFound error={error ? error.message : "The requested project could not be found."} />;
  }

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
