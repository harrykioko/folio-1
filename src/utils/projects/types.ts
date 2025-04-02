
import { ProjectFormValues } from "@/components/projects/form/ProjectFormSchema";

export type Project = {
  id: number;
  name: string;
  description: string | null;
  status: "active" | "development" | "archive" | "ideation";
  created_by: string | null;
  created_at: string;
  updated_at: string;
  progress?: number;
  startDate?: string;
  dueDate?: string;
  team?: number;
  domains?: string[];
  hasGithub?: boolean;
  social?: string[];
}

// Update this type to match the ProjectFormValues structure
export type ProjectFormData = ProjectFormValues;
