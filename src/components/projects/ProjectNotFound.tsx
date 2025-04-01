
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProjectNotFoundProps {
  error: string | null;
}

const ProjectNotFound: React.FC<ProjectNotFoundProps> = ({ error }) => {
  const navigate = useNavigate();
  
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
};

export default ProjectNotFound;
