
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";

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

// Update this type to match the ProjectFormValues structure
export type ProjectFormData = ProjectFormValues;

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
export const fetchProjectById = async (id: number) => {
  // Safety check: don't try to fetch if id is invalid
  if (id === undefined || id === null || isNaN(id)) {
    throw new Error("Invalid project ID");
  }
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }
  
  return data as Project;
};

// Create a new project
export const createProject = async (project: ProjectFormValues) => {
  // Check if user is authenticated
  const { data: sessionData } = await supabase.auth.getSession();
  
  if (!sessionData.session) {
    throw new Error('You must be logged in to create a project');
  }
  
  // Extract only the fields that should be sent to the database
  // We only need name, description, and status for the database
  const projectData = {
    name: project.name,
    description: project.description,
    status: project.status
    // Additional fields can be added later as the database schema evolves
  };
  
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }
  
  return data as Project;
};

// Update an existing project
export const updateProject = async (id: number, updates: Partial<ProjectFormValues>) => {
  // Extract only database fields from the updates
  const projectUpdates = {
    name: updates.name,
    description: updates.description,
    status: updates.status
    // Add other fields as needed
  };

  const { data, error } = await supabase
    .from('projects')
    .update(projectUpdates)
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
