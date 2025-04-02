
import React from "react";
import { Project } from "@/utils/projects";
import ProjectCard from "./ProjectCard";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface ProjectListProps {
  projects: Project[];
  status?: Project['status'] | "all";
  searchQuery: string;
}

const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  status = "all",
  searchQuery
}) => {
  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Further filter by status if not "all"
  const displayProjects = status === "all" 
    ? filteredProjects 
    : filteredProjects.filter(project => project.status === status);

  // Helper function to get status display info
  const getStatusInfo = (status: Project["status"]) => {
    switch(status) {
      case 'active':
        return { 
          label: 'Active',
          icon: <CheckCircle2 className="mr-1 h-3 w-3" />,
          variant: 'default' as const
        };
      case 'development':
        return { 
          label: 'In Development',
          icon: <Clock className="mr-1 h-3 w-3" />,
          variant: 'default' as const
        };
      case 'ideation':
        return { 
          label: 'Ideation',
          icon: <AlertCircle className="mr-1 h-3 w-3" />,
          variant: 'secondary' as const
        };
      case 'archive':
        return { 
          label: 'Archived',
          icon: <AlertCircle className="mr-1 h-3 w-3" />,
          variant: 'outline' as const
        };
      default:
        return { 
          label: 'Unknown',
          icon: <AlertCircle className="mr-1 h-3 w-3" />,
          variant: 'outline' as const
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayProjects.map((project) => (
          <ProjectCard key={project.id} project={project} getStatusInfo={getStatusInfo} />
        ))}
      </div>
      {displayProjects.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            {status === "all" 
              ? "No projects found matching your search" 
              : `No ${status} projects found`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
