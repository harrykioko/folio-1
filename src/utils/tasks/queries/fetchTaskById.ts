
import { supabase } from "@/integrations/supabase/client";
import type { Task } from "../types";
import { toast } from "sonner";

// Fetch a single task by ID
export const fetchTaskById = async (id: number | string): Promise<Task> => {
  try {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', numericId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        toast.error(`Task not found with ID ${id}`);
      } else {
        toast.error(`Error fetching task: ${error.message}`);
      }
      throw error;
    }
    
    return data as Task;
  } catch (error) {
    if (error instanceof Error && !error.message.includes('Task not found')) {
      toast.error("Failed to fetch task details. Please try again later.");
    }
    throw error;
  }
};
