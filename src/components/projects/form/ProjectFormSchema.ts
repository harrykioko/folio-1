
import { z } from "zod";

// Project schema for form validation
export const projectSchema = z.object({
  name: z.string().min(2, { message: "Project name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
  githubRepo: z.string().optional(),
  domains: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const getDefaultValues = () => ({
  name: "",
  description: "",
  startDate: new Date().toISOString().split("T")[0],
  dueDate: "",
  githubRepo: "",
  domains: "",
  twitter: "",
  instagram: "",
  linkedin: "",
});
