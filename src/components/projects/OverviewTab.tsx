
import React from "react";
import { Project } from "@/utils/projects";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import {
  ProgressCard,
  TimelineCard,
  TeamCard,
  ResourcesCard,
  TasksOverviewCard
} from "./overview";

interface OverviewTabProps {
  project: Project;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ project }) => {
  // Calculate social accounts for display
  const socialAccounts = [];
  // Safely check if social array exists before using includes method
  const socialArray = Array.isArray(project.social) ? project.social : [];
  
  if (socialArray.includes("twitter")) socialAccounts.push({ name: "Twitter", icon: Twitter });
  if (socialArray.includes("instagram")) socialAccounts.push({ name: "Instagram", icon: Instagram });
  if (socialArray.includes("linkedin")) socialAccounts.push({ name: "LinkedIn", icon: Linkedin });

  // Use default values for progress and other properties if they're undefined
  const progress = project.progress ?? 0;
  const startDate = project.startDate ?? "Not set";
  const dueDate = project.dueDate ?? "Not set";
  const team = project.team ?? 1;
  const domains = project.domains ?? [];
  const hasGithub = project.hasGithub ?? false;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProgressCard progress={progress} />
        <TimelineCard startDate={startDate} dueDate={dueDate} />
        <TeamCard teamSize={team} />
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <ResourcesCard 
          domains={domains} 
          hasGithub={hasGithub} 
          socialAccounts={socialAccounts} 
        />
        <TasksOverviewCard projectId={project.id} progress={progress} />
      </div>
    </div>
  );
};

export default OverviewTab;
