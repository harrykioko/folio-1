
import { supabase } from "@/integrations/supabase/client";
import type { Task, TaskFormData } from "./types";

// Create a new task
export const createTask = async (taskData: TaskFormData): Promise<Task> => {
  try {
    console.log('Creating new task with data:', JSON.stringify(taskData, null, 2));
    
    // Prepare the task data - ensure all fields are properly formatted
    const formattedTaskData = {
      title: taskData.title,
      description: taskData.description || null,
      project_id: taskData.project_id ? Number(taskData.project_id) : null,
      assigned_to: taskData.assigned_to || null,
      priority: taskData.priority,
      deadline: taskData.deadline || null,
      status: taskData.status
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
    
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating task with ID ${id}:`, error);
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
    
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting task with ID ${id}:`, error);
      throw error;
    }
    
    console.log(`Successfully deleted task with ID: ${id}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete task with ID ${id}:`, error);
    throw error;
  }
};
