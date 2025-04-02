
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Task } from "./types";

// Type for related task relationship
export type RelatedTask = {
  id: string;
  task_id: number;
  related_task_id: number;
  created_at: string;
};

// Fetch related tasks for a specific task
export const fetchRelatedTasks = async (taskId: number): Promise<Task[]> => {
  try {
    // First get the IDs of related tasks
    const { data: relatedTaskIds, error: relatedError } = await supabase
      .from('related_tasks')
      .select('related_task_id')
      .eq('task_id', taskId);
    
    if (relatedError) {
      toast.error(`Error fetching related tasks: ${relatedError.message}`);
      throw relatedError;
    }
    
    if (!relatedTaskIds || relatedTaskIds.length === 0) {
      return [];
    }
    
    // Then fetch the actual task data for those IDs
    const ids = relatedTaskIds.map(item => item.related_task_id);
    
    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .in('id', ids);
    
    if (tasksError) {
      toast.error(`Error fetching task details: ${tasksError.message}`);
      throw tasksError;
    }
    
    return tasks as Task[];
  } catch (error) {
    console.error("Failed to fetch related tasks:", error);
    return [];
  }
};

// Link a task to another task
export const linkTask = async (taskId: number, relatedTaskId: number): Promise<boolean> => {
  try {
    // Check if relation already exists
    const { data: existing, error: checkError } = await supabase
      .from('related_tasks')
      .select('id')
      .eq('task_id', taskId)
      .eq('related_task_id', relatedTaskId)
      .maybeSingle();
    
    if (checkError) {
      toast.error(`Error checking existing relation: ${checkError.message}`);
      return false;
    }
    
    // If relation already exists, don't create a duplicate
    if (existing) {
      toast.info("Tasks are already linked");
      return true;
    }
    
    const { error } = await supabase
      .from('related_tasks')
      .insert({
        task_id: taskId,
        related_task_id: relatedTaskId,
      });
    
    if (error) {
      toast.error(`Error linking task: ${error.message}`);
      return false;
    }
    
    toast.success("Task linked successfully");
    return true;
  } catch (error) {
    console.error("Failed to link task:", error);
    toast.error("Failed to link task");
    return false;
  }
};

// Unlink a task from another task
export const unlinkTask = async (taskId: number, relatedTaskId: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('related_tasks')
      .delete()
      .eq('task_id', taskId)
      .eq('related_task_id', relatedTaskId);
    
    if (error) {
      toast.error(`Error unlinking task: ${error.message}`);
      return false;
    }
    
    toast.success("Task unlinked successfully");
    return true;
  } catch (error) {
    console.error("Failed to unlink task:", error);
    toast.error("Failed to unlink task");
    return false;
  }
};
