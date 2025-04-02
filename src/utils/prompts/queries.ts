
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Prompt } from "./types";

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
