
import React from "react";
import { Card } from "@/components/ui/card";
import { useTasksTab } from "./useTasksTab";
import TasksTabHeader from "./TasksTabHeader";
import TasksTable from "./TasksTable";
import TasksEmptyState from "./TasksEmptyState";
import TasksLoadingState from "./TasksLoadingState";
import TasksErrorState from "./TasksErrorState";

interface TasksTabContainerProps {
  projectId: number;
}

const TasksTabContainer: React.FC<TasksTabContainerProps> = ({ projectId }) => {
  const { tasks, isLoading, error, users, isLoadingUsers, handleAddTask } = useTasksTab(projectId);

  return (
    <Card>
      <TasksTabHeader projectId={projectId} />
      
      {isLoading && <TasksLoadingState />}
      
      {error && <TasksErrorState />}
      
      {!isLoading && !error && (!tasks || tasks.length === 0) && (
        <TasksEmptyState onAddTask={handleAddTask} />
      )}
      
      {!isLoading && !error && tasks && tasks.length > 0 && (
        <Card className="p-6">
          <TasksTable 
            tasks={tasks} 
            users={users} 
            isLoadingUsers={isLoadingUsers} 
          />
        </Card>
      )}
    </Card>
  );
};

export default TasksTabContainer;
