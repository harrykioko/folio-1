
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type TaskActivity = {
  id: string;
  task_id: number;
  type: 'status_change' | 'assignment' | 'priority_change' | 'creation' | 'comment';
  message: string;
  created_by: string;
  created_at: string;
}

export type TaskActivityFormData = {
  task_id: number;
  type: TaskActivity['type'];
  message: string;
}

/**
 * Records a new activity for a task
 */
export const recordTaskActivity = async (activityData: TaskActivityFormData): Promise<TaskActivity | null> => {
  try {
    // Ensure user is authenticated
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      toast.error("You must be logged in to record task activity");
      return null;
    }
    
    // Using type assertion to bypass TypeScript errors until Supabase types are updated
    const { data, error } = await (supabase
      .from('task_activity')
      .insert([{
        task_id: activityData.task_id,
        type: activityData.type,
        message: activityData.message,
        created_by: session.session.user.id
      }]) as any)
      .select()
      .single();
    
    if (error) {
      console.error("Error recording task activity:", error);
      toast.error("Failed to record activity");
      return null;
    }
    
    return data as unknown as TaskActivity;
  } catch (error) {
    console.error("Failed to record task activity:", error);
    return null;
  }
};

/**
 * Fetches activities for a specific task
 */
export const fetchTaskActivities = async (taskId: number): Promise<TaskActivity[]> => {
  try {
    // Using type assertion to bypass TypeScript errors until Supabase types are updated
    const { data, error } = await (supabase
      .from('task_activity')
      .select('*')
      .eq('task_id', taskId)
      .order('created_at', { ascending: false }) as any);
    
    if (error) {
      console.error("Error fetching task activities:", error);
      return [];
    }
    
    return data as unknown as TaskActivity[];
  } catch (error) {
    console.error("Failed to fetch task activities:", error);
    return [];
  }
};
