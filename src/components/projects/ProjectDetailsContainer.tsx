
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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const fetchedProject = await fetchProjectById(id as string);
        setProject(fetchedProject);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

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
  if (error || !project) return <ProjectNotFound />;

  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <ProjectHeader
        name={project.name}
        description={project.description || ""}
        status={project.status}
        projectId={project.id}
        setIsEditDialogOpen={() => {}}
        setIsDeleteDialogOpen={() => {}}
      />
      
      <ProjectContent
        project={project}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProjectDetailsContainer;
