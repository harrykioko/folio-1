
import { supabase } from "@/integrations/supabase/client";
import type { Task } from "../types";
import { toast } from "sonner";

// Fetch tasks for a specific project
export const fetchTasksByProjectId = async (projectId: number): Promise<Task[]> => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error(`Error fetching project tasks: ${error.message}`);
      throw error;
    }
    
    return data as Task[];
  } catch (error) {
    toast.error("Failed to fetch project tasks. Please try again later.");
    throw error;
  }
};
