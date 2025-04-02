
import { supabase } from "@/integrations/supabase/client";
import type { Task, TaskFormData } from "../types";
import { toast } from "sonner";
import { recordTaskActivity } from "../taskActivity";

// Update an existing task
export const updateTask = async (id: number, taskData: Partial<TaskFormData>): Promise<Task> => {
  try {
    // Check authentication before updating
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      toast.error("You must be logged in to update tasks");
      throw new Error('User not authenticated');
    }
    
    // Prepare the task data - ensure all fields are properly formatted
    const formattedTaskData: Record<string, any> = {};
    
    if (taskData.title !== undefined) formattedTaskData.title = taskData.title;
    if (taskData.description !== undefined) formattedTaskData.description = taskData.description || null;
    if (taskData.project_id !== undefined) formattedTaskData.project_id = taskData.project_id ? Number(taskData.project_id) : null;
    if (taskData.assigned_to !== undefined) formattedTaskData.assigned_to = taskData.assigned_to || null;
    if (taskData.priority !== undefined) formattedTaskData.priority = taskData.priority;
    if (taskData.deadline !== undefined) formattedTaskData.deadline = taskData.deadline || null;
    if (taskData.status !== undefined) formattedTaskData.status = taskData.status;
    
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

    // Record appropriate activity type based on what changed
    let activityType: "status_change" | "assignment" | "priority_change" | "creation" | "comment" = "comment";
    let message = `Task "${data.title}" updated`;
    
    if (taskData.status !== undefined) {
      activityType = "status_change";
      message = `Task status changed to ${data.status}`;
    } else if (taskData.assigned_to !== undefined) {
      activityType = "assignment";
      message = `Task assigned to ${data.assigned_to || 'no one'}`;
    } else if (taskData.priority !== undefined) {
      activityType = "priority_change";
      message = `Task priority changed to ${data.priority}`;
    }
    
    // Record task update activity
    await recordTaskActivity({
      task_id: data.id,
      type: activityType,
      message
    });
    
    return data as Task;
  } catch (error) {
    if (error instanceof Error && !error.message.includes('User not authenticated')) {
      toast.error("Failed to update task. Please try again later.");
    }
    throw error;
  }
};
