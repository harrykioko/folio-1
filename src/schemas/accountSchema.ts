
import * as z from "zod";

// Form schema validation
export const accountFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z.string({ required_error: "Please select an account type." }),
  url: z.string().url({ message: "Please enter a valid URL." }),
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
  projectId: z.string().optional(),
  expiryDate: z.string().optional(),
  notes: z.string().optional(),
  savePassword: z.boolean().default(true),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;
