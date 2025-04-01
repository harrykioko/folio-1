
import { supabase } from "@/integrations/supabase/client";
import type { Task, TaskFormData } from "./types";
import { toast } from "sonner";

// Create a new task
export const createTask = async (taskData: TaskFormData): Promise<Task> => {
  try {
    console.log('Creating new task with data:', JSON.stringify(taskData, null, 2));
    
    // Ensure user is authenticated
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      console.error('User is not authenticated');
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
    
    console.log('Formatted task data for insert:', JSON.stringify(formattedTaskData, null, 2));
    
    const { data, error } = await supabase
      .from('tasks')
      .insert([formattedTaskData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating task:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      if (error.code === '42501') {
        toast.error("Permission denied: Task creation failed due to security policy. Please check you have the right access level.");
      } else {
        toast.error(`Failed to create task: ${error.message}`);
      }
      
      throw error;
    }
    
    if (!data) {
      console.error('No data returned after creating task');
      throw new Error('Failed to create task: No data returned');
    }
    
    console.log('Successfully created task:', data);
    return data as Task;
  } catch (error) {
    console.error('Failed to create task:', error);
    throw error;
  }
};

// Update an existing task
export const updateTask = async (id: number, updates: Partial<TaskFormData>): Promise<Task> => {
  try {
    console.log(`Updating task with ID ${id} with data:`, updates);
    
    // Check authentication before updating
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      console.error('User is not authenticated');
      toast.error("You must be logged in to update tasks");
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating task with ID ${id}:`, error);
      
      if (error.code === '42501') {
        toast.error("Permission denied: Task update failed due to security policy. Please check you have the right access level.");
      } else {
        toast.error(`Failed to update task: ${error.message}`);
      }
      
      throw error;
    }
    
    console.log('Successfully updated task:', data);
    return data as Task;
  } catch (error) {
    console.error(`Failed to update task with ID ${id}:`, error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id: number): Promise<boolean> => {
  try {
    console.log(`Deleting task with ID: ${id}`);
    
    // Check authentication before deleting
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      console.error('User is not authenticated');
      toast.error("You must be logged in to delete tasks");
      throw new Error('User not authenticated');
    }
    
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting task with ID ${id}:`, error);
      
      if (error.code === '42501') {
        toast.error("Permission denied: Task deletion failed due to security policy. Please check you have the right access level.");
      } else {
        toast.error(`Failed to delete task: ${error.message}`);
      }
      
      throw error;
    }
    
    console.log(`Successfully deleted task with ID: ${id}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete task with ID ${id}:`, error);
    throw error;
  }
};
