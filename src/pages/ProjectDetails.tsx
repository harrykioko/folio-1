
import React from "react";
import ProjectDetailsContainer from "@/components/projects/ProjectDetailsContainer";

const ProjectDetails: React.FC = () => {
  // Add debug log to verify the component is being mounted
  console.log("Rendering ProjectDetails page");
  return <ProjectDetailsContainer />;
};

export default ProjectDetails;
