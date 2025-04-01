
import * as z from "zod";

export const TaskFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  status: z.string(),
  priority: z.string(),
  projectId: z.string().optional(),
  assignee: z.string().optional(),
  dueDate: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;
