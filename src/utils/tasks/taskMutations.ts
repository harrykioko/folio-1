
import { supabase } from "@/integrations/supabase/client";
import type { Task, TaskFormData } from "./types";
import { toast } from "sonner";

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
    
    return data as Task;
  } catch (error) {
    if (error instanceof Error && !error.message.includes('User not authenticated')) {
      toast.error("Failed to create task. Please try again later.");
    }
    throw error;
  }
};

// Update an existing task
export const updateTask = async (id: number, updates: Partial<TaskFormData>): Promise<Task> => {
  try {
    // Check authentication before updating
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      toast.error("You must be logged in to update tasks");
      throw new Error('User not authenticated');
    }
    
    console.log(`Updating task ${id} with:`, updates);
    
    // Ensure status is valid if it's being updated
    if (updates.status && !['todo', 'in_progress', 'completed'].includes(updates.status)) {
      toast.error(`Invalid status value: ${updates.status}`);
      throw new Error(`Invalid status value: ${updates.status}`);
    }
    
    // Convert numeric string IDs to numbers if project_id is included
    const formattedUpdates = { ...updates };
    if (formattedUpdates.project_id && typeof formattedUpdates.project_id === 'string') {
      formattedUpdates.project_id = parseInt(formattedUpdates.project_id, 10);
    }
    
    const { data, error } = await supabase
      .from('tasks')
      .update(formattedUpdates)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error("Supabase error:", error);
      if (error.code === '42501') {
        toast.error("Permission denied: Task update failed due to security policy. Please check you have the right access level.");
      } else {
        toast.error(`Failed to update task: ${error.message}`);
      }
      
      throw error;
    }
    
    if (!data || data.length === 0) {
      toast.error("No data returned after updating task");
      throw new Error("Failed to update task: No data returned");
    }
    
    return data[0] as Task;
  } catch (error) {
    console.error("Error updating task:", error);
    if (error instanceof Error && !error.message.includes('User not authenticated')) {
      toast.error("Failed to update task. Please try again later.");
    }
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id: number): Promise<boolean> => {
  try {
    // Check authentication before deleting
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      toast.error("You must be logged in to delete tasks");
      throw new Error('User not authenticated');
    }
    
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === '42501') {
        toast.error("Permission denied: Task deletion failed due to security policy. Please check you have the right access level.");
      } else {
        toast.error(`Failed to delete task: ${error.message}`);
      }
      
      throw error;
    }
    
    return true;
  } catch (error) {
    if (error instanceof Error && !error.message.includes('User not authenticated')) {
      toast.error("Failed to delete task. Please try again later.");
    }
    throw error;
  }
};
