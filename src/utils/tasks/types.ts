
import type { Database } from "@/integrations/supabase/types";

export type Task = {
  id: number;
  title: string;
  description: string | null;
  project_id: number | null;
  assigned_to: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline: string | null;
  status: 'todo' | 'in_progress' | 'done';
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
  status: 'todo' | 'in_progress' | 'done';
}
