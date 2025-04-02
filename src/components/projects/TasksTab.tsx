
import React from "react";
import TasksTabContainer from "./tasks/TasksTabContainer";

interface TasksTabProps {
  projectId: number;
}

const TasksTab: React.FC<TasksTabProps> = ({ projectId }) => {
  return <TasksTabContainer projectId={projectId} />;
};

export default TasksTab;
