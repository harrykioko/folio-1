
import React from "react";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { useAccounts } from "@/hooks/useAccounts";
import { 
  StatsCards, 
  DashboardHeader, 
  DashboardTabContent, 
  ActivityCard 
} from "@/components/dashboard";
import { useQuery } from "@tanstack/react-query";
import { fetchPrompts } from "@/utils/prompts/queries";
import { Prompt } from "@/utils/prompts/types";

const Dashboard: React.FC = () => {
  const { projects, isLoading: projectsLoading } = useProjects();
  const { tasks, isLoading: tasksLoading } = useTasks();
  const { accounts, isLoading: accountsLoading } = useAccounts();
  
  // Fetch prompts data
  const { data: prompts, isLoading: promptsLoading } = useQuery({
    queryKey: ['prompts'],
    queryFn: fetchPrompts
  });
  
  const projectCount = projects?.length || 0;
  const taskCount = tasks?.length || 0;
  const accountCount = accounts?.length || 0;
  const promptCount = (prompts as Prompt[] | undefined)?.length || 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHeader />

      <StatsCards 
        projectCount={projectCount}
        taskCount={taskCount}
        accountCount={accountCount}
        promptCount={promptCount}
        projectsLoading={projectsLoading}
        tasksLoading={tasksLoading}
        accountsLoading={accountsLoading}
        promptsLoading={promptsLoading}
      />

      <DashboardTabContent />

      <ActivityCard />
    </div>
  );
};

export default Dashboard;
