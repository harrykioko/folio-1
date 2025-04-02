
import { z } from "zod";

export const promptFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  prompt: z.string().min(20, "Prompt must be at least 20 characters"),
  effectiveness: z.string().optional(),
  projectId: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type PromptFormValues = z.infer<typeof promptFormSchema>;
