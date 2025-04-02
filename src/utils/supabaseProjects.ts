
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Project = {
  id: number;
  name: string;
  description: string | null;
  status: "active" | "development" | "archive" | "ideation";
  created_by: string | null;
  created_at: string;
  updated_at: string;
  progress?: number;
  startDate?: string;
  dueDate?: string;
  team?: number;
  domains?: string[];
  hasGithub?: boolean;
  social?: string[];
}

export type ProjectFormData = {
  name: string;
  description: string;
  status: Project["status"];
}

// Fetch all projects
export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
  
  return data as Project[];
};

// Fetch a single project by ID
export const fetchProjectById = async (id: number | string) => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', numericId)
    .single();
  
  if (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }
  
  return data as Project;
};

// Create a new project
export const createProject = async (project: ProjectFormData) => {
  // Check if user is authenticated
  const { data: sessionData } = await supabase.auth.getSession();
  
  if (!sessionData.session) {
    throw new Error('You must be logged in to create a project');
  }
  
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }
  
  return data as Project;
};

// Update an existing project
export const updateProject = async (id: number, updates: Partial<ProjectFormData>) => {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating project with id ${id}:`, error);
    throw error;
  }
  
  return data as Project;
};

// Delete a project
export const deleteProject = async (id: number) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting project with id ${id}:`, error);
    throw error;
  }
  
  return true;
};
