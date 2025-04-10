import { supabase } from "@/integrations/supabase/client";
import { fetchPromptsByProjectId as fetchPromptsByProjectIdQuery } from "@/utils/prompts/queries";

export interface Prompt {
  id: number;
  name: string;
  content: string;
  description?: string;
  project_id?: number;
  created_at: string;
  updated_at?: string;
  tags: string[];
  user_id?: string;
}

// Re-export the fetchPromptsByProjectId function from queries
export const fetchPromptsByProjectId = fetchPromptsByProjectIdQuery;

// Keeping the mock implementation for backward compatibility
export const getMockPromptsByProjectId = async (projectId: number): Promise<Prompt[]> => {
  // For now, we'll use mock data
  const mockPrompts: Prompt[] = [
    {
      id: 1,
      name: "Welcome Email",
      content: "Write a welcome email for {{name}} who just signed up for our service.",
      description: "A friendly welcome email for new users",
      project_id: 1,
      created_at: "2023-09-15T10:30:00Z",
      updated_at: "2023-09-15T10:30:00Z",
      tags: ["email", "onboarding"]
    },
    {
      id: 2,
      name: "SEO Meta Description",
      content: "Write an SEO-optimized meta description for a {{product}} page that includes {{keyword}}.",
      description: "Meta description template for product pages",
      project_id: 1,
      created_at: "2023-09-16T14:20:00Z",
      updated_at: "2023-09-17T09:15:00Z",
      tags: ["seo", "marketing"]
    },
    {
      id: 3,
      name: "Product Feature List",
      content: "Create a bullet point list of features for {{product}} highlighting its benefits for {{audience}}.",
      description: "Feature list generator for marketing materials",
      project_id: 1,
      created_at: "2023-09-18T11:45:00Z",
      updated_at: "2023-09-18T16:30:00Z",
      tags: ["marketing", "product"]
    }
  ];
  
  // Return mock data for now
  // Only return prompts for the requested project
  return mockPrompts.filter(prompt => prompt.project_id === projectId);
};
