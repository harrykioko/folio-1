
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsTabContent from "./ProjectsTabContent";
import TasksTabContent from "./TasksTabContent";
import PromptsTabContent from "./PromptsTabContent";

const DashboardTabContent: React.FC = () => {
  return (
    <Tabs defaultValue="projects" className="space-y-4">
      <TabsList>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="prompts">Recent Prompts</TabsTrigger>
      </TabsList>

      <TabsContent value="projects" className="space-y-4">
        <ProjectsTabContent />
      </TabsContent>

      <TabsContent value="tasks" className="space-y-4">
        <TasksTabContent />
      </TabsContent>

      <TabsContent value="prompts" className="space-y-4">
        <PromptsTabContent />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabContent;
