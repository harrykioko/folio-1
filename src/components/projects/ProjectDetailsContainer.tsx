
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProjectById, updateProject, deleteProject, Project } from "@/utils/supabaseProjects";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectContent from "@/components/projects/ProjectContent";
import ProjectDetailLoading from "@/components/projects/ProjectDetailLoading";
import ProjectNotFound from "@/components/projects/ProjectNotFound";
import { toast } from "sonner";

const ProjectDetailsContainer: React.FC = () => {
  const { id, projectId } = useParams<{ id?: string; projectId?: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Use the correct ID parameter, either 'id' or 'projectId' depending on the route
  const effectiveId = id || projectId;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        
        // Check if effectiveId exists and is not "new" before fetching
        if (effectiveId && effectiveId !== "new") {
          const fetchedProject = await fetchProjectById(effectiveId);
          setProject(fetchedProject);
        } else if (effectiveId === "new") {
          // Handle "new" project case if needed
          setProject(null);
        } else {
          throw new Error("No project ID provided");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [effectiveId]);

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

  if (loading) return <ProjectDetailLoading />;
  
  // Ensure we pass the error message to ProjectNotFound
  if (error || !project) return <ProjectNotFound error={error ? error.message : "The requested project could not be found."} />;

  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <ProjectHeader
        name={project.name}
        description={project.description || ""}
        status={project.status}
        projectId={project.id}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      
      <ProjectContent
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
