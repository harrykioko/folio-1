
import React from "react";
import { Project } from "@/utils/supabaseProjects";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricsSection from "../metrics/MetricsSection";
import TasksSection from "../tasks/TasksSection";
import CommentSection from "../comments/CommentSection";
import { getDefaultMetrics } from "../metrics/metrics-data";
import OverviewTab from "../OverviewTab";
import TasksTab from "../TasksTab";
import AccountsTab from "../AccountsTab";
import PromptsTab from "../PromptsTab";
import ActivityTab from "../ActivityTab";

interface ProjectMainContentProps {
  project: Project;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProjectMainContent: React.FC<ProjectMainContentProps> = ({
  project,
  activeTab,
  setActiveTab
}) => {
  // Get metrics data from our utility
  const metrics = getDefaultMetrics();

  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <MetricsSection metrics={metrics} />

      {/* Task Kanban View */}
      <TasksSection projectId={project.id} />
      
      {/* Comments Section */}
      <CommentSection />
    </div>
  );
};

export default ProjectMainContent;
