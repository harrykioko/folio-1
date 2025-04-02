
import { z } from "zod";
import { AccountType, SocialPlatform } from "@/utils/accountTypes";

// Create an account form schema with Zod
export const accountFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["Domain", "SocialMedia", "Email", "Repository", "Service"]),
  platform: z.enum(["Instagram", "Facebook", "LinkedIn", "Twitter", "TikTok", "Pinterest"]).nullable().optional(),
  url: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  projectId: z.string().optional().nullable(),
  ownerId: z.string().optional().nullable(),
  expiryDate: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  savePassword: z.boolean().default(true),
  // Additional fields for specific account types
  hostedOn: z.string().optional().nullable(),
  renewalCost: z.number().optional().nullable(),
  monthlyCost: z.number().optional().nullable(),
  // Fields for social media accounts
  followers: z.number().optional().nullable(),
  impressions: z.number().optional().nullable(),
});

// Type for account form values
export type AccountFormValues = z.infer<typeof accountFormSchema>;

// Filters for the account list
export interface AccountFilters {
  type: string | null;
  platform?: string | null;
  projectId: string | null;
  expiryStatus: string | null;
}
