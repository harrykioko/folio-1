
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Prompt, PromptFormData } from "./types";

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
      description: promptData.description || null,
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
