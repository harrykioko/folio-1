
import { supabase } from "@/integrations/supabase/client";
import { Project } from "./types";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";
import { format, isValid, parseISO } from "date-fns";

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
    
    // Get user ID from session for RLS
    const userId = sessionData.session.user.id;
    
    // Format dates safely for database storage
    let startDate = null;
    let dueDate = null;
    
    try {
      // Safely format dates without using dynamic evaluation
      if (project.startDate) {
        const parsedStartDate = parseISO(project.startDate);
        if (isValid(parsedStartDate)) {
          startDate = format(parsedStartDate, 'yyyy-MM-dd');
        } else {
          throw new Error('Invalid start date format');
        }
      }
      
      if (project.dueDate) {
        const parsedDueDate = parseISO(project.dueDate);
        if (isValid(parsedDueDate)) {
          dueDate = format(parsedDueDate, 'yyyy-MM-dd');
        } else {
          throw new Error('Invalid due date format');
        }
      }
    } catch (dateError) {
      console.error('Error formatting dates:', dateError);
      throw new Error('Invalid date format. Please check your date entries.');
    }
    
    // Extract and map fields with correct naming convention for database
    const projectData = {
      name: project.name,
      description: project.description,
      status: project.status || 'ideation',
      start_date: startDate,
      due_date: dueDate,
      created_by: userId // Add created_by field for RLS
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
  
  // Format dates safely if they exist
  let startDate = undefined;
  let dueDate = undefined;
  
  try {
    if (updates.startDate) {
      const parsedStartDate = parseISO(updates.startDate);
      if (isValid(parsedStartDate)) {
        startDate = format(parsedStartDate, 'yyyy-MM-dd');
      } else {
        throw new Error('Invalid start date format');
      }
    }
    
    if (updates.dueDate) {
      const parsedDueDate = parseISO(updates.dueDate);
      if (isValid(parsedDueDate)) {
        dueDate = format(parsedDueDate, 'yyyy-MM-dd');
      } else {
        throw new Error('Invalid due date format');
      }
    }
  } catch (dateError) {
    console.error('Error formatting dates for update:', dateError);
    throw new Error('Invalid date format for update. Please check your date entries.');
  }
  
  // Extract and map fields with correct naming convention for database
  const projectUpdates = {
    name: updates.name,
    description: updates.description,
    status: updates.status,
    start_date: startDate,
    due_date: dueDate
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
