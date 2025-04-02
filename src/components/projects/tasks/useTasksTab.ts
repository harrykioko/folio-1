
import { useNavigate } from "react-router-dom";
import { useTasks } from "@/hooks/useTasks";
import { useUsers } from "@/hooks/useUsers";

export const useTasksTab = (projectId: number) => {
  const navigate = useNavigate();
  const { tasks, isLoading, error, refreshTasks } = useTasks(projectId);
  const { users, isLoading: isLoadingUsers } = useUsers();
  
  const handleAddTask = () => {
    navigate(`/tasks/new?projectId=${projectId}`);
  };

  return {
    tasks,
    isLoading,
    error,
    users,
    isLoadingUsers,
    handleAddTask,
    refreshTasks
  };
};
