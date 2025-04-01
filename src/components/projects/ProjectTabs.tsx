
import React from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./OverviewTab";
import TasksTab from "./TasksTab";
import AccountsTab from "./AccountsTab";
import PromptsTab from "./PromptsTab";
import ActivityTab from "./ActivityTab";

interface ProjectTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  project: any;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({
  activeTab,
  setActiveTab,
  project,
}) => {
  const navigate = useNavigate();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="accounts">Accounts</TabsTrigger>
        <TabsTrigger value="prompts">Prompts</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <OverviewTab project={project} />
      </TabsContent>
      
      <TabsContent value="tasks">
        <TasksTab projectId={project.id} />
      </TabsContent>
      
      <TabsContent value="accounts">
        <AccountsTab projectId={project.id} />
      </TabsContent>
      
      <TabsContent value="prompts">
        <PromptsTab projectId={project.id} />
      </TabsContent>
      
      <TabsContent value="activity">
        <ActivityTab projectId={project.id} />
      </TabsContent>
    </Tabs>
  );
};

export default ProjectTabs;
