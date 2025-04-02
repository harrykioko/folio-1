
import { supabase } from "@/integrations/supabase/client";
import type { Task, TaskFormData } from "../types";
import { toast } from "sonner";
import { recordTaskActivity } from "../taskActivity";

// Update an existing task
export const updateTask = async (id: number, updates: Partial<TaskFormData>): Promise<Task> => {
  try {
    // Check authentication before updating
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      toast.error("You must be logged in to update tasks");
      throw new Error('User not authenticated');
    }
    
    console.log(`Updating task ${id} with:`, updates);

    // Get the current task data for comparison
    const { data: currentTask } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();
    
    // Ensure status is valid if it's being updated
    if (updates.status && !['todo', 'in_progress', 'completed'].includes(updates.status)) {
      toast.error(`Invalid status value: ${updates.status}`);
      throw new Error(`Invalid status value: ${updates.status}`);
    }
    
    // Convert numeric string IDs to numbers if project_id is included
    const formattedUpdates = { ...updates };
    if (formattedUpdates.project_id && typeof formattedUpdates.project_id === 'string') {
      formattedUpdates.project_id = parseInt(formattedUpdates.project_id, 10);
    }
    
    // Log the actual update being performed for debugging
    console.log('Formatted updates being sent to Supabase:', formattedUpdates);
    console.log('Task ID being updated:', id);
    
    // Explicitly add the returning option to ensure data is returned
    const { data, error } = await supabase
      .from('tasks')
      .update(formattedUpdates)
      .eq('id', id)
      .select('*');
    
    if (error) {
      console.error("Supabase error:", error);
      if (error.code === '42501') {
        toast.error("Permission denied: Task update failed due to security policy. Please check you have the right access level.");
      } else {
        toast.error(`Failed to update task: ${error.message}`);
      }
      
      throw error;
    }
    
    // Validate that we got data back
    if (!data || data.length === 0) {
      console.error("No data returned after task update. Task ID:", id);
      toast.error("No data returned after updating task");
      throw new Error("Failed to update task: No data returned");
    }
    
    const updatedTask = data[0] as Task;
    console.log('Updated task data received:', updatedTask);

    // Record activities for changes if currentTask exists
    if (currentTask) {
      await recordTaskUpdates(id, currentTask, updates);
    }
    
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    if (error instanceof Error && !error.message.includes('User not authenticated')) {
      toast.error("Failed to update task. Please try again later.");
    }
    throw error;
  }
};

// Helper function to record various types of task updates
async function recordTaskUpdates(
  taskId: number,
  currentTask: Task,
  updates: Partial<TaskFormData>
): Promise<void> {
  // Status change activity
  if (updates.status && updates.status !== currentTask.status) {
    await recordTaskActivity({
      task_id: taskId,
      type: 'status_change',
      message: `Status changed from "${currentTask.status}" to "${updates.status}"`
    });
  }

  // Assignment change activity
  if (updates.assigned_to && updates.assigned_to !== currentTask.assigned_to) {
    let assigneeName = "Unassigned";
    if (updates.assigned_to !== "unassigned") {
      const { data: userData } = await supabase
        .from('users')
        .select('full_name, email')
        .eq('id', updates.assigned_to)
        .single();
      
      assigneeName = userData?.full_name || userData?.email || updates.assigned_to;
    }
    
    await recordTaskActivity({
      task_id: taskId,
      type: 'assignment',
      message: `Task assigned to ${assigneeName}`
    });
  }

  // Priority change activity
  if (updates.priority && updates.priority !== currentTask.priority) {
    await recordTaskActivity({
      task_id: taskId,
      type: 'priority_change',
      message: `Priority changed from "${currentTask.priority}" to "${updates.priority}"`
    });
  }
}
