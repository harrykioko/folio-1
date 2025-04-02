
import { useState } from 'react';
import { updateTask as updateTaskAPI } from '@/utils/tasks';
import type { Task, TaskFormData } from '@/utils/tasks/types';

/**
 * A hook for task mutations with loading state management
 */
export function useTaskMutation() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateTask = async (id: number, updates: Partial<TaskFormData>): Promise<Task> => {
    try {
      setIsUpdating(true);
      setError(null);
      
      const updatedTask = await updateTaskAPI(id, updates);
      return updatedTask;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update task'));
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateTask,
    isUpdating,
    error
  };
}
