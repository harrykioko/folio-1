
import { toast } from "@/hooks/use-toast";
import { accountsData } from './accountData';
import { supabase } from "@/integrations/supabase/client";
import { AccountFormValues } from "@/schemas/accountSchema";
import { AccountType, SocialPlatform } from "@/utils/accountTypes";
import { Database } from "@/integrations/supabase/types";

// Copy to clipboard function
export const copyToClipboard = (text: string, type: string) => {
  navigator.clipboard.writeText(text);
  toast({
    title: "Copied to clipboard",
    description: `${type} has been copied to your clipboard.`,
  });
};

// Handle account deletion
export const handleDeleteAccount = (accountId: string, navigate: (path: string) => void) => {
  if (window.confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
    // In a real app, you would call an API to delete the account
    toast({
      title: "Account deleted",
      description: "The account has been removed from the system.",
    });
    navigate("/accounts");
  }
};

// Fetch account data by ID
export const fetchAccountById = (accountId: string | undefined) => {
  if (!accountId) return null;
  return accountsData.find(a => a.id === accountId);
};

// Create a new account in Supabase
export const createAccount = async (data: AccountFormValues) => {
  try {
    // Step 1: Insert the base account data
    const { data: accountData, error: accountError } = await supabase
      .from('accounts')
      .insert({
        name: data.name,
        type: data.type as Database["public"]["Enums"]["account_type"],
        username: data.username || null,
        url: data.url || null,
        password: data.savePassword && data.password ? data.password : null,
        project_id: data.projectId ? parseInt(data.projectId) : null,
        renewal_date: data.expiryDate || null
      })
      .select('id')
      .single();

    if (accountError) {
      console.error("Error creating account:", accountError);
      throw new Error("Failed to create account");
    }

    const accountId = accountData.id;

    // Step 2: Insert type-specific data based on account type
    if (data.type === "Domain" && (data.hostedOn || data.renewalCost !== null)) {
      const { error: domainError } = await supabase
        .from('account_domains')
        .insert({
          account_id: accountId,
          hosted_on: data.hostedOn || null,
          renewal_cost: data.renewalCost || null
        });

      if (domainError) {
        console.error("Error creating domain details:", domainError);
        throw new Error("Failed to create domain details");
      }
    }

    if (data.type === "SocialMedia" && data.platform) {
      const { error: socialMediaError } = await supabase
        .from('account_social_media')
        .insert({
          account_id: accountId,
          platform: data.platform as Database["public"]["Enums"]["social_platform"],
          followers: data.followers || null,
          impressions: data.impressions || null
        });

      if (socialMediaError) {
        console.error("Error creating social media details:", socialMediaError);
        throw new Error("Failed to create social media details");
      }
    }

    if (data.type === "Service" && data.monthlyCost !== null) {
      const { error: serviceError } = await supabase
        .from('account_services')
        .insert({
          account_id: accountId,
          monthly_cost: data.monthlyCost || null
        });

      if (serviceError) {
        console.error("Error creating service details:", serviceError);
        throw new Error("Failed to create service details");
      }
    }

    return accountId;
  } catch (error) {
    console.error("Error in createAccount:", error);
    throw error;
  }
};
