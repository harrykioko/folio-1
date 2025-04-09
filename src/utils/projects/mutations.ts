
import { supabase } from "@/integrations/supabase/client";
import { Project } from "./types";
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";
import { format } from "date-fns";

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
    
    // Format dates safely for database storage
    let startDate = null;
    let dueDate = null;
    
    try {
      if (project.startDate) {
        startDate = format(new Date(project.startDate), 'yyyy-MM-dd');
      }
      
      if (project.dueDate) {
        dueDate = format(new Date(project.dueDate), 'yyyy-MM-dd');
      }
    } catch (dateError) {
      console.error('Error formatting dates:', dateError);
      throw new Error('Invalid date format. Please check your date entries.');
    }
    
    // Extract only the fields that should be sent to the database
    const projectData = {
      name: project.name,
      description: project.description,
      status: project.status,
      startDate: startDate,
      dueDate: dueDate
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
      startDate = format(new Date(updates.startDate), 'yyyy-MM-dd');
    }
    
    if (updates.dueDate) {
      dueDate = format(new Date(updates.dueDate), 'yyyy-MM-dd');
    }
  } catch (dateError) {
    console.error('Error formatting dates for update:', dateError);
    throw new Error('Invalid date format for update. Please check your date entries.');
  }
  
  // Extract only database fields from the updates
  const projectUpdates = {
    name: updates.name,
    description: updates.description,
    status: updates.status,
    startDate: startDate,
    dueDate: dueDate
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
