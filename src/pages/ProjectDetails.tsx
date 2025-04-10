
import React from "react";
import ProjectDetailsContainer from "@/components/projects/ProjectDetailsContainer";
import { useLocation } from "react-router-dom";

const ProjectDetails: React.FC = () => {
  const location = useLocation();
  
  // Add debug log to verify the component is being mounted and on which route
  console.log("Rendering ProjectDetails page", {
    path: location.pathname,
    isNewRoute: location.pathname === "/projects/new"
  });
  
  return <ProjectDetailsContainer />;
};

export default ProjectDetails;
