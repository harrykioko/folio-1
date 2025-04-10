
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

const Dashboard: React.FC = () => {
  const { projects, isLoading: projectsLoading } = useProjects();
  const { tasks, isLoading: tasksLoading } = useTasks();
  const { accounts, isLoading: accountsLoading } = useAccounts();
  
  const projectCount = projects?.length || 0;
  const taskCount = tasks?.length || 0;
  const accountCount = accounts?.length || 0;
  const promptCount = 132;

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
      />

      <DashboardTabContent />

      <ActivityCard />
    </div>
  );
};

export default Dashboard;
