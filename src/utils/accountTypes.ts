
import { Database } from "@/integrations/supabase/types";

// Type definitions for accounts
export interface Account {
  id: string;  // Using string to support UUIDs
  name: string;
  type: AccountType;
  url: string;
  username: string;
  password: string;
  notes?: string;
  expiryDate?: string;
  projectId?: string;  // Changed from number to string
  projectName?: string;
  // Additional fields for specific account types
  platform?: SocialPlatform;
  hostedOn?: string;
  renewalCost?: number;
  monthlyCost?: number;
  // Social media specific fields
  followers?: number;
  impressions?: number;
}

// Using the Supabase enum types
export type AccountType = Database["public"]["Enums"]["account_type"];
export type SocialPlatform = Database["public"]["Enums"]["social_platform"];

// Available account types with stricter typing
export const accountTypes = [
  { id: "Domain" as const, name: "Domain" },
  { id: "SocialMedia" as const, name: "Social Media" },
  { id: "Email" as const, name: "Email" },
  { id: "Repository" as const, name: "Repository" },
  { id: "Service" as const, name: "Service/Platform" }
];

// Available social media platforms with stricter typing
export const socialPlatforms = [
  { id: "Instagram" as const, name: "Instagram" },
  { id: "Facebook" as const, name: "Facebook" },
  { id: "LinkedIn" as const, name: "LinkedIn" },
  { id: "Twitter" as const, name: "Twitter" },
  { id: "TikTok" as const, name: "TikTok" },
  { id: "Pinterest" as const, name: "Pinterest" }
];
