
import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, fetchTasksByProjectId, Task } from '@/utils/tasks';

/**
 * Hook for fetching and managing tasks data
 * @returns Tasks data with loading and error states
 */
export function useTasks(projectId?: number) {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let data;
      if (projectId) {
        data = await fetchTasksByProjectId(projectId);
      } else {
        data = await fetchTasks();
      }
      
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load tasks'));
      // Toast errors are handled in the API functions
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  // Function to manually refresh tasks data
  const refreshTasks = useCallback(async () => {
    await loadTasks();
  }, [loadTasks]);

  // Load tasks on mount and when projectId changes
  useEffect(() => {
    loadTasks();
  }, [loadTasks, projectId]);

  return {
    tasks,
    isLoading,
    error,
    refreshTasks
  };
}
