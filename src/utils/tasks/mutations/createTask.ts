
import { supabase } from "@/integrations/supabase/client";
import type { Task, TaskFormData } from "../types";
import { toast } from "sonner";
import { recordTaskActivity } from "../taskActivity";

// Create a new task
export const createTask = async (taskData: TaskFormData): Promise<Task> => {
  try {
    // Ensure user is authenticated
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      toast.error("You must be logged in to create tasks");
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
      // Add the user ID as created_by
      created_by: session.session.user.id
    };
    
    const { data, error } = await supabase
      .from('tasks')
      .insert([formattedTaskData])
      .select()
      .single();
    
    if (error) {
      if (error.code === '42501') {
        toast.error("Permission denied: Task creation failed due to security policy. Please check you have the right access level.");
      } else {
        toast.error(`Failed to create task: ${error.message}`);
      }
      
      throw error;
    }
    
    if (!data) {
      toast.error('No data returned after creating task');
      throw new Error('Failed to create task: No data returned');
    }

    // Record task creation activity
    await recordTaskActivity({
      task_id: data.id,
      type: 'creation',
      message: `Task "${data.title}" created`
    });
    
    return data as Task;
  } catch (error) {
    if (error instanceof Error && !error.message.includes('User not authenticated')) {
      toast.error("Failed to create task. Please try again later.");
    }
    throw error;
  }
};
