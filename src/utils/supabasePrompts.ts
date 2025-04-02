
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// TypeScript type definitions
export type Prompt = {
  id: number;
  name: string;
  content: string;
  tags: string[] | null;
  project_id: number | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type PromptFormData = {
  name: string;
  content: string;
  tags?: string[];
  project_id?: number | null;
}

// Helper function to format tags as comma-separated string
export const formatTagsString = (tags: string[] | null): string => {
  if (!tags || tags.length === 0) return "";
  return tags.join(", ");
};

// Fetch all prompts
export const fetchPrompts = async (): Promise<Prompt[]> => {
  try {
    console.log("Fetching all prompts");
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching prompts:", error);
      toast.error(`Error fetching prompts: ${error.message}`);
      throw error;
    }
    
    console.log(`Successfully fetched ${data?.length || 0} prompts`);
    return data as Prompt[];
  } catch (error) {
    console.error("Failed to fetch prompts:", error);
    toast.error("Failed to fetch prompts. Please try again later.");
    throw error;
  }
};

// Fetch a single prompt by ID
export const fetchPromptById = async (id: number): Promise<Prompt> => {
  try {
    console.log(`Fetching prompt with ID: ${id}`);
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching prompt with ID ${id}:`, error);
      toast.error(`Error fetching prompt: ${error.message}`);
      throw error;
    }
    
    console.log(`Successfully fetched prompt with ID: ${id}`);
    return data as Prompt;
  } catch (error) {
    console.error(`Failed to fetch prompt with ID ${id}:`, error);
    toast.error("Failed to fetch prompt details. Please try again later.");
    throw error;
  }
};

// Create a new prompt
export const createPrompt = async (promptData: PromptFormData): Promise<Prompt> => {
  try {
    // Get current authenticated user
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      const authError = new Error("You must be logged in to create prompts");
      console.error(authError);
      toast.error(authError.message);
      throw authError;
    }
    
    // Prepare the data with user ID
    const formattedPromptData = {
      name: promptData.name,
      content: promptData.content,
      tags: promptData.tags || [],
      project_id: promptData.project_id || null,
      created_by: session.user.id,
    };
    
    console.log("Creating new prompt:", formattedPromptData);
    
    const { data: result, error } = await supabase
      .from('prompts')
      .insert([formattedPromptData])
      .select()
      .single();
    
    if (error) {
      console.error("Error creating prompt:", error);
      toast.error(`Error creating prompt: ${error.message}`);
      throw error;
    }
    
    console.log("Successfully created prompt:", result);
    toast.success("Prompt created successfully");
    return result as Prompt;
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("You must be logged in")) {
      toast.error("Failed to create prompt. Please try again later.");
    }
    throw error;
  }
};

// Update an existing prompt
export const updatePrompt = async (id: number, updates: Partial<PromptFormData>): Promise<Prompt> => {
  try {
    console.log(`Updating prompt with ID ${id}:`, updates);
    
    // Get current authenticated user
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      const authError = new Error("You must be logged in to update prompts");
      console.error(authError);
      toast.error(authError.message);
      throw authError;
    }
    
    const { data, error } = await supabase
      .from('prompts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating prompt with ID ${id}:`, error);
      toast.error(`Error updating prompt: ${error.message}`);
      throw error;
    }
    
    console.log(`Successfully updated prompt with ID ${id}:`, data);
    toast.success("Prompt updated successfully");
    return data as Prompt;
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("You must be logged in")) {
      toast.error("Failed to update prompt. Please try again later.");
    }
    throw error;
  }
};

// Delete a prompt
export const deletePrompt = async (id: number): Promise<boolean> => {
  try {
    console.log(`Deleting prompt with ID: ${id}`);
    
    // Get current authenticated user
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      const authError = new Error("You must be logged in to delete prompts");
      console.error(authError);
      toast.error(authError.message);
      throw authError;
    }
    
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting prompt with ID ${id}:`, error);
      toast.error(`Error deleting prompt: ${error.message}`);
      throw error;
    }
    
    console.log(`Successfully deleted prompt with ID: ${id}`);
    toast.success("Prompt deleted successfully");
    return true;
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("You must be logged in")) {
      toast.error("Failed to delete prompt. Please try again later.");
    }
    throw error;
  }
};

// Fetch prompts for a specific project
export const fetchPromptsByProjectId = async (projectId: number): Promise<Prompt[]> => {
  try {
    console.log(`Fetching prompts for project ID: ${projectId}`);
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching prompts for project ID ${projectId}:`, error);
      toast.error(`Error fetching project prompts: ${error.message}`);
      throw error;
    }
    
    console.log(`Successfully fetched ${data?.length || 0} prompts for project ID: ${projectId}`);
    return data as Prompt[];
  } catch (error) {
    console.error(`Failed to fetch prompts for project ID ${projectId}:`, error);
    toast.error("Failed to fetch project prompts. Please try again later.");
    throw error;
  }
};
