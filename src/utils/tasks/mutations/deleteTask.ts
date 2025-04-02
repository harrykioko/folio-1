
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Delete a task
export const deleteTask = async (id: number): Promise<boolean> => {
  try {
    // Check authentication before deleting
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      toast.error("You must be logged in to delete tasks");
      throw new Error('User not authenticated');
    }
    
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === '42501') {
        toast.error("Permission denied: Task deletion failed due to security policy. Please check you have the right access level.");
      } else {
        toast.error(`Failed to delete task: ${error.message}`);
      }
      
      throw error;
    }
    
    return true;
  } catch (error) {
    if (error instanceof Error && !error.message.includes('User not authenticated')) {
      toast.error("Failed to delete task. Please try again later.");
    }
    throw error;
  }
};
