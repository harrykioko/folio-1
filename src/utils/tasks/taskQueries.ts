
import { supabase } from "@/integrations/supabase/client";
import type { Task } from "./types";

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
