
import { supabase } from "@/integrations/supabase/client";
import type { Task, TaskFormData } from "../types";
import { toast } from "sonner";
import { recordTaskActivity } from "../taskActivity";

// Update an existing task
export const updateTask = async (id: number, taskData: TaskFormData): Promise<Task> => {
  try {
    // Check authentication before updating
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      toast.error("You must be logged in to update tasks");
      throw new Error('User not authenticated');
    }
    
    // Prepare the task data - ensure all fields are properly formatted
    const formattedTaskData = {
      title: taskData.title,
      description: taskData.description || null,
      project_id: taskData.project_id ? Number(taskData.project_id) : null,
      assigned_to: taskData.assigned_to || null,
      priority: taskData.priority,
      deadline: taskData.deadline || null,
      status: taskData.status,
    };
    
    const { data, error } = await supabase
      .from('tasks')
      .update(formattedTaskData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === '42501') {
        toast.error("Permission denied: Task update failed due to security policy. Please check you have the right access level.");
      } else {
        toast.error(`Failed to update task: ${error.message}`);
      }
      
      throw error;
    }
    
    if (!data) {
      toast.error('No data returned after updating task');
      throw new Error('Failed to update task: No data returned');
    }

    // Record task update activity
    await recordTaskActivity({
      task_id: data.id,
      type: 'update',
      message: `Task "${data.title}" updated`
    });
    
    return data as Task;
  } catch (error) {
    if (error instanceof Error && !error.message.includes('User not authenticated')) {
      toast.error("Failed to update task. Please try again later.");
    }
    throw error;
  }
};
