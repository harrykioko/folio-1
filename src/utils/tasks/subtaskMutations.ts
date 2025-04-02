
import { supabase } from "@/integrations/supabase/client";
import type { Subtask, SubtaskFormData } from "./types";
import { toast } from "sonner";

// Fetch subtasks for a specific task
export const fetchSubtasksByTaskId = async (taskId: number): Promise<Subtask[]> => {
  try {
    const { data, error } = await supabase
      .from('subtasks')
      .select('*')
      .eq('task_id', taskId)
      .order('created_at', { ascending: true });
    
    if (error) {
      toast.error(`Error fetching subtasks: ${error.message}`);
      throw error;
    }
    
    return data as Subtask[];
  } catch (error) {
    toast.error("Failed to fetch subtasks. Please try again later.");
    throw error;
  }
};

// Create a new subtask
export const createSubtask = async (taskId: number, subtaskData: SubtaskFormData): Promise<Subtask> => {
  try {
    const { data, error } = await supabase
      .from('subtasks')
      .insert([{ 
        task_id: taskId,
        title: subtaskData.title,
        is_complete: subtaskData.is_complete || false,
        due_date: subtaskData.due_date || null
      }])
      .select()
      .single();
    
    if (error) {
      toast.error(`Failed to create subtask: ${error.message}`);
      throw error;
    }
    
    return data as Subtask;
  } catch (error) {
    toast.error("Failed to create subtask. Please try again later.");
    throw error;
  }
};

// Update an existing subtask
export const updateSubtask = async (id: string, updates: Partial<SubtaskFormData>): Promise<Subtask> => {
  try {
    const { data, error } = await supabase
      .from('subtasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      toast.error(`Failed to update subtask: ${error.message}`);
      throw error;
    }
    
    return data as Subtask;
  } catch (error) {
    toast.error("Failed to update subtask. Please try again later.");
    throw error;
  }
};

// Delete a subtask
export const deleteSubtask = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('subtasks')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast.error(`Failed to delete subtask: ${error.message}`);
      throw error;
    }
    
    return true;
  } catch (error) {
    toast.error("Failed to delete subtask. Please try again later.");
    throw error;
  }
};
