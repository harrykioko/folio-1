
import { supabase } from "@/integrations/supabase/client";
import type { Task } from "../types";
import { toast } from "sonner";

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error(`Error fetching tasks: ${error.message}`);
      throw error;
    }
    
    return data as Task[];
  } catch (error) {
    toast.error("Failed to fetch tasks. Please try again later.");
    throw error;
  }
};
