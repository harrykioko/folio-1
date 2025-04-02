
import { useState, useEffect, useCallback } from 'react';
import { fetchRelatedTasks, linkTask, unlinkTask } from '@/utils/tasks/relatedTasks';
import { Task } from '@/utils/tasks/types';

export function useRelatedTasks(taskId?: number) {
  const [relatedTasks, setRelatedTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadRelatedTasks = useCallback(async () => {
    if (!taskId) {
      setRelatedTasks([]);
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const tasks = await fetchRelatedTasks(taskId);
      setRelatedTasks(tasks);
    } catch (err) {
      console.error("Error loading related tasks:", err);
      setError(err instanceof Error ? err : new Error('Failed to load related tasks'));
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  // Load related tasks on mount and when taskId changes
  useEffect(() => {
    loadRelatedTasks();
  }, [loadRelatedTasks]);

  // Link a task and refresh the list
  const handleLinkTask = useCallback(async (relatedTaskId: number) => {
    if (!taskId) return false;
    
    const success = await linkTask(taskId, relatedTaskId);
    if (success) {
      await loadRelatedTasks();
    }
    return success;
  }, [taskId, loadRelatedTasks]);

  // Unlink a task and refresh the list
  const handleUnlinkTask = useCallback(async (relatedTaskId: number) => {
    if (!taskId) return false;
    
    const success = await unlinkTask(taskId, relatedTaskId);
    if (success) {
      await loadRelatedTasks();
    }
    return success;
  }, [taskId, loadRelatedTasks]);

  return {
    relatedTasks,
    isLoading,
    error,
    refreshRelatedTasks: loadRelatedTasks,
    linkTask: handleLinkTask,
    unlinkTask: handleUnlinkTask
  };
}
