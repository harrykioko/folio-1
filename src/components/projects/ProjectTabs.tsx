
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./OverviewTab";
import EmptyTabContent from "./EmptyTabContent";

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
        <EmptyTabContent
          title="Tasks"
          description="No tasks have been added to this project yet."
          buttonText="Add Task"
          buttonLink=""
          onButtonClick={() => {}}
        />
      </TabsContent>
      
      <TabsContent value="accounts">
        <EmptyTabContent
          title="Linked Accounts"
          description="No accounts have been linked to this project yet."
          buttonText="Add Account"
          buttonLink="/accounts/new"
        />
      </TabsContent>
      
      <TabsContent value="prompts">
        <EmptyTabContent
          title="Prompt Library"
          description="No prompts have been added to this project yet."
          buttonText="Add Prompt"
          buttonLink="/prompts/new"
        />
      </TabsContent>
      
      <TabsContent value="activity">
        <EmptyTabContent
          title="Activity Log"
          description="No recent activity for this project."
          buttonText=""
          buttonLink=""
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProjectTabs;
