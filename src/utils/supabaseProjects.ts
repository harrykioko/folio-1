
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
  console.log("fetchProjects called");
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
  
  console.log("Projects fetched:", data?.length || 0);
  return data as Project[];
};

// Fetch a single project by ID
export const fetchProjectById = async (id: number) => {
  // Comprehensive input validation
  console.log("fetchProjectById called with:", { id, type: typeof id });
  
  // Validate ID
  if (id === undefined || id === null) {
    const error = new Error(`Invalid project ID: undefined`);
    console.error(error);
    throw error;
  }
  
  if (isNaN(id)) {
    const error = new Error(`Invalid project ID (not a number): ${id}`);
    console.error(error);
    throw error;
  }
  
  // Ensure we're not trying to fetch with "new"
  if (typeof id === 'string' && (id === 'new' || id.toLowerCase() === 'new')) {
    const error = new Error(`Cannot fetch project with ID "new"`);
    console.error(error);
    throw error;
  }
  
  try {
    console.log(`Making Supabase query for project with ID: ${id}`);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error(`Supabase returned an error for project ID ${id}:`, error);
      throw error;
    }
    
    if (!data) {
      const notFoundError = new Error(`Project with ID ${id} not found in database`);
      console.error(notFoundError);
      throw notFoundError;
    }
    
    console.log(`Successfully fetched project ${id}:`, data);
    return data as Project;
  } catch (err) {
    console.error(`Failed to fetch project with ID ${id}:`, err);
    throw err;
  }
};

// Create a new project
export const createProject = async (project: ProjectFormValues) => {
  console.log("createProject called with:", project);
  
  try {
    // Check if user is authenticated
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) {
      const error = new Error('You must be logged in to create a project');
      console.error(error);
      throw error;
    }
    
    // Extract only the fields that should be sent to the database
    const projectData = {
      name: project.name,
      description: project.description,
      status: project.status
    };
    
    console.log("Submitting project data to Supabase:", projectData);
    
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }
    
    if (!data) {
      const dataError = new Error('Project created but no data returned');
      console.error(dataError);
      throw dataError;
    }
    
    console.log('Project created successfully:', data);
    return data as Project;
  } catch (err) {
    console.error('Project creation failed:', err);
    throw err;
  }
};

// Update an existing project
export const updateProject = async (id: number, updates: Partial<ProjectFormValues>) => {
  console.log(`updateProject called for ID ${id} with:`, updates);
  
  // Extract only database fields from the updates
  const projectUpdates = {
    name: updates.name,
    description: updates.description,
    status: updates.status
    // Add other fields as needed
  };

  try {
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
    
    if (!data) {
      const dataError = new Error(`Project with ID ${id} updated but no data returned`);
      console.error(dataError);
      throw dataError;
    }
    
    console.log(`Successfully updated project ${id}:`, data);
    return data as Project;
  } catch (err) {
    console.error(`Failed to update project with ID ${id}:`, err);
    throw err;
  }
};

// Delete a project
export const deleteProject = async (id: number) => {
  console.log(`deleteProject called for ID ${id}`);
  
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting project with id ${id}:`, error);
      throw error;
    }
    
    console.log(`Successfully deleted project ${id}`);
    return true;
  } catch (err) {
    console.error(`Failed to delete project with ID ${id}:`, err);
    throw err;
  }
};
