
export type Prompt = {
  id: number;
  name: string;
  content: string;
  description: string | null;
  tags: string[] | null;
  project_id: number | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type PromptFormData = {
  name: string;
  content: string;
  description?: string | null;
  tags?: string[];
  project_id?: number | null;
}
