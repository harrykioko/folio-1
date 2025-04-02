
import { supabase } from "@/integrations/supabase/client";
import { Project } from "./types";

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
export const fetchProjectById = async (id: number | string) => {
  // Comprehensive input validation
  console.log("fetchProjectById called with:", { id, type: typeof id });
  
  // Special case: check if ID is the string "new" (for new project route)
  if (id === "new") {
    const error = new Error(`Cannot fetch project with ID "new"`);
    console.error(error);
    throw error;
  }
  
  // Validate ID is not undefined/null
  if (id === undefined || id === null) {
    const error = new Error(`Invalid project ID: undefined`);
    console.error(error);
    throw error;
  }
  
  // Convert string ID to number if needed
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  
  // Check if conversion resulted in a valid number
  if (isNaN(numericId)) {
    const error = new Error(`Invalid project ID (not a number): ${id}`);
    console.error(error);
    throw error;
  }
  
  try {
    console.log(`Making Supabase query for project with ID: ${numericId}`);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', numericId)
      .maybeSingle();
    
    if (error) {
      console.error(`Supabase returned an error for project ID ${numericId}:`, error);
      throw error;
    }
    
    if (!data) {
      const notFoundError = new Error(`Project with ID ${numericId} not found in database`);
      console.error(notFoundError);
      throw notFoundError;
    }
    
    console.log(`Successfully fetched project ${numericId}:`, data);
    return data as Project;
  } catch (err) {
    console.error(`Failed to fetch project with ID ${numericId}:`, err);
    throw err;
  }
};
