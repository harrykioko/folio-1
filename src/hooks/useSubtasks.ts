
import { useState, useEffect, useCallback } from 'react';
import { 
  fetchSubtasksByTaskId, 
  createSubtask, 
  updateSubtask, 
  deleteSubtask 
} from '@/utils/tasks/subtaskMutations';
import type { Subtask, SubtaskFormData } from '@/utils/tasks/types';

export function useSubtasks(taskId: number) {
  const [subtasks, setSubtasks] = useState<Subtask[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadSubtasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fetchSubtasksByTaskId(taskId);
      setSubtasks(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load subtasks'));
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  // Load subtasks on mount
  useEffect(() => {
    loadSubtasks();
  }, [loadSubtasks]);

  const addSubtask = async (subtaskData: SubtaskFormData) => {
    try {
      const newSubtask = await createSubtask(taskId, subtaskData);
      setSubtasks(prev => prev ? [...prev, newSubtask] : [newSubtask]);
      return newSubtask;
    } catch (error) {
      console.error("Error adding subtask:", error);
      throw error;
    }
  };

  const toggleSubtaskCompletion = async (id: string, isComplete: boolean) => {
    try {
      const updatedSubtask = await updateSubtask(id, { is_complete: isComplete });
      setSubtasks(prev => 
        prev ? prev.map(item => item.id === id ? updatedSubtask : item) : null
      );
      return updatedSubtask;
    } catch (error) {
      console.error("Error updating subtask:", error);
      throw error;
    }
  };

  const removeSubtask = async (id: string) => {
    try {
      await deleteSubtask(id);
      setSubtasks(prev => prev ? prev.filter(item => item.id !== id) : null);
    } catch (error) {
      console.error("Error removing subtask:", error);
      throw error;
    }
  };

  const getCompletionStats = () => {
    if (!subtasks || subtasks.length === 0) {
      return { completed: 0, total: 0, percentage: 0 };
    }
    
    const completed = subtasks.filter(item => item.is_complete).length;
    const total = subtasks.length;
    const percentage = Math.round((completed / total) * 100);
    
    return { completed, total, percentage };
  };

  return {
    subtasks,
    isLoading,
    error,
    getCompletionStats,
    addSubtask,
    toggleSubtaskCompletion,
    removeSubtask,
    refreshSubtasks: loadSubtasks
  };
}
