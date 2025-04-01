
import React from "react";

const ProjectDetailLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading project details...</p>
      </div>
    </div>
  );
};

export default ProjectDetailLoading;
