import type { Database } from "@/integrations/supabase/types";

export type Task = {
  id: number;
  title: string;
  description: string | null;
  project_id: number | null;
  assigned_to: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline: string | null;
  status: 'todo' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export type TaskFormData = {
  title: string;
  description?: string;
  project_id?: number | null;
  assigned_to?: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline?: string | null;
  status: 'todo' | 'in_progress' | 'completed';
}

export type Subtask = {
  id: string;
  task_id: number;
  title: string;
  is_complete: boolean;
  due_date: string | null;
  created_at: string;
}

export type SubtaskFormData = {
  title: string;
  is_complete?: boolean;
  due_date?: string | null;
}
