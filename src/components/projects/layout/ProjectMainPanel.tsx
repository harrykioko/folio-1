
import React from "react";
import { Project } from "@/utils/supabaseProjects";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import OverviewTab from "../OverviewTab";
import TasksTab from "../TasksTab";
import AccountsTab from "../AccountsTab";
import PromptsTab from "../PromptsTab";
import ActivityTab from "../ActivityTab";

interface ProjectMainPanelProps {
  project: Project;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
}

const ProjectMainPanel: React.FC<ProjectMainPanelProps> = ({
  project,
  activeTab,
  setActiveTab,
  setIsEditDialogOpen,
  setIsDeleteDialogOpen
}) => {
  return (
    <Card className="rounded-2xl shadow-md overflow-hidden border-t-4 border-t-primary">
      <div className="px-6 pt-6 pb-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-4 bg-transparent p-0 h-auto space-x-1">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4 py-2"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4 py-2"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger 
              value="accounts" 
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4 py-2"
            >
              Accounts
            </TabsTrigger>
            <TabsTrigger 
              value="prompts" 
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4 py-2"
            >
              Prompts
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4 py-2"
            >
              Activity
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="px-6 pb-6 pt-2">
        {activeTab === "overview" && <OverviewTab project={project} />}
        {activeTab === "tasks" && <TasksTab projectId={project.id} />}
        {activeTab === "accounts" && <AccountsTab projectId={project.id} />}
        {activeTab === "prompts" && <PromptsTab projectId={project.id} />}
        {activeTab === "activity" && <ActivityTab projectId={project.id} />}
      </div>
    </Card>
  );
};

export default ProjectMainPanel;
