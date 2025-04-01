
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Task = {
  id: number;
  title: string;
  description: string | null;
  project_id: number | null;
  assigned_to: string | null;
  priority: 'low' | 'medium' | 'high';
  deadline: string | null;
  status: 'todo' | 'in_progress' | 'done';
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export type TaskFormData = {
  title: string;
  description?: string;
  project_id?: number | null;
  assigned_to?: string | null;
  priority: 'low' | 'medium' | 'high';
  deadline?: string | null;
  status: 'todo' | 'in_progress' | 'done';
}

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    console.log('Fetching all tasks from Supabase');
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
    
    console.log(`Successfully fetched ${data?.length || 0} tasks`);
    return data as Task[];
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
};

// Fetch a single task by ID
export const fetchTaskById = async (id: number | string): Promise<Task> => {
  try {
    console.log(`Fetching task with ID: ${id}`);
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', numericId)
      .single();
    
    if (error) {
      console.error(`Error fetching task with ID ${id}:`, error);
      throw error;
    }
    
    console.log('Successfully fetched task:', data);
    return data as Task;
  } catch (error) {
    console.error(`Failed to fetch task with ID ${id}:`, error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData: TaskFormData): Promise<Task> => {
  try {
    console.log('Creating new task with data:', taskData);
    
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        title: taskData.title,
        description: taskData.description || null,
        project_id: taskData.project_id || null,
        assigned_to: taskData.assigned_to || null,
        priority: taskData.priority,
        deadline: taskData.deadline || null,
        status: taskData.status
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating task:', error);
      throw error;
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

// Fetch tasks for a specific project
export const fetchTasksByProjectId = async (projectId: number): Promise<Task[]> => {
  try {
    console.log(`Fetching tasks for project ID: ${projectId}`);
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching tasks for project ID ${projectId}:`, error);
      throw error;
    }
    
    console.log(`Successfully fetched ${data?.length || 0} tasks for project ID ${projectId}`);
    return data as Task[];
  } catch (error) {
    console.error(`Failed to fetch tasks for project ID ${projectId}:`, error);
    throw error;
  }
};

// Helper function to convert database status to UI-friendly format
export const formatTaskStatus = (status: Task['status']): string => {
  switch (status) {
    case 'todo': return 'To Do';
    case 'in_progress': return 'In Progress';
    case 'done': return 'Done';
    default: return status;
  }
};

// Helper function to convert UI-friendly format back to database status
export const parseTaskStatus = (status: string): Task['status'] => {
  switch (status.toLowerCase()) {
    case 'to do': return 'todo';
    case 'in progress': return 'in_progress';
    case 'done': return 'done';
    default: return 'todo';
  }
};
