
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
    // First get the IDs of related tasks using raw SQL query
    const { data: relatedTaskIds, error: relatedError } = await supabase
      .rpc('get_related_task_ids', { current_task_id: taskId });
    
    if (relatedError) {
      toast.error(`Error fetching related tasks: ${relatedError.message}`);
      throw relatedError;
    }
    
    if (!relatedTaskIds || relatedTaskIds.length === 0) {
      return [];
    }
    
    // Then fetch the actual task data for those IDs
    const ids = relatedTaskIds;
    
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
    // Check if relation already exists using a custom RPC function
    const { data: existing, error: checkError } = await supabase
      .rpc('check_task_relation_exists', { 
        task_id_param: taskId, 
        related_task_id_param: relatedTaskId 
      });
    
    if (checkError) {
      toast.error(`Error checking existing relation: ${checkError.message}`);
      return false;
    }
    
    // If relation already exists, don't create a duplicate
    if (existing) {
      toast.info("Tasks are already linked");
      return true;
    }
    
    // Use a custom RPC function to insert the relation
    const { error } = await supabase
      .rpc('link_related_task', {
        task_id_param: taskId,
        related_task_id_param: relatedTaskId
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
    // Use a custom RPC function to delete the relation
    const { error } = await supabase
      .rpc('unlink_related_task', {
        task_id_param: taskId,
        related_task_id_param: relatedTaskId
      });
    
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
