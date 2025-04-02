
import React from "react";
import { Card } from "@/components/ui/card";
import { useTasksTab } from "./useTasksTab";
import TasksTabHeader from "./TasksTabHeader";
import TasksEmptyState from "./TasksEmptyState";
import TasksLoadingState from "./TasksLoadingState";
import TasksErrorState from "./TasksErrorState";
import KanbanBoard from "@/components/tasks/kanban/KanbanBoard";

interface TasksTabContainerProps {
  projectId: number;
}

const TasksTabContainer: React.FC<TasksTabContainerProps> = ({ projectId }) => {
  const { tasks, isLoading, error, users, isLoadingUsers, handleAddTask, refreshTasks } = useTasksTab(projectId);

  return (
    <Card>
      <TasksTabHeader projectId={projectId} />
      
      {isLoading && <TasksLoadingState />}
      
      {error && <TasksErrorState />}
      
      {!isLoading && !error && (!tasks || tasks.length === 0) && (
        <TasksEmptyState onAddTask={handleAddTask} />
      )}
      
      {!isLoading && !error && tasks && tasks.length > 0 && (
        <div className="p-6">
          <KanbanBoard 
            tasks={tasks} 
            refreshTasks={refreshTasks}
          />
        </div>
      )}
    </Card>
  );
};

export default TasksTabContainer;
