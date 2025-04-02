
import { Database } from "@/integrations/supabase/types";

// Type definitions for accounts
export interface Account {
  id: number;
  name: string;
  type: AccountType;
  url: string;
  username: string;
  password: string;
  notes?: string;
  expiryDate?: string;
  projectId?: number;
  projectName?: string;
  // Additional fields for specific account types
  platform?: SocialPlatform;
  hostedOn?: string;
  renewalCost?: number;
  monthlyCost?: number;
}

// Using the Supabase enum types
export type AccountType = Database["public"]["Enums"]["account_type"];
export type SocialPlatform = Database["public"]["Enums"]["social_platform"];

// Available account types
export const accountTypes = [
  { id: "Domain", name: "Domain" },
  { id: "SocialMedia", name: "Social Media" },
  { id: "Email", name: "Email" },
  { id: "Repository", name: "Repository" },
  { id: "Service", name: "Service/Platform" }
];

// Available social media platforms
export const socialPlatforms = [
  { id: "Instagram", name: "Instagram" },
  { id: "Facebook", name: "Facebook" },
  { id: "LinkedIn", name: "LinkedIn" },
  { id: "Twitter", name: "Twitter" },
  { id: "TikTok", name: "TikTok" },
  { id: "Pinterest", name: "Pinterest" }
];
