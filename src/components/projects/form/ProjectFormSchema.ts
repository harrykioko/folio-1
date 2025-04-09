
import { z } from "zod";

// Project schema for form validation
export const projectSchema = z.object({
  name: z.string().min(2, { message: "Project name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  status: z.enum(["active", "development", "archive", "ideation"]).default("ideation"),
  startDate: z.string().min(1, { message: "Start date is required" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
  githubRepo: z.string().optional(),
  domains: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
}).refine((data) => {
  // Skip validation if either date is missing
  if (!data.startDate || !data.dueDate) return true;
  
  // Parse dates for comparison - use explicit Date constructor instead of eval-based methods
  const startDate = new Date(data.startDate);
  const dueDate = new Date(data.dueDate);
  
  // Ensure both dates are valid before comparison
  if (isNaN(startDate.getTime()) || isNaN(dueDate.getTime())) return true;
  
  // Ensure start date is before or equal to due date
  return startDate <= dueDate;
}, {
  message: "Start date must be before or equal to due date",
  path: ["dueDate"], // Show error on the due date field
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const getDefaultValues = () => {
  // Use explicit string formatting instead of any potential eval-based methods
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  
  return {
    name: "",
    description: "",
    status: "ideation" as const,
    startDate: formattedDate,
    dueDate: "",
    githubRepo: "",
    domains: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  };
};
