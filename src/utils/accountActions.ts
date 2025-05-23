
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
    console.log("Creating account with data:", JSON.stringify(data, null, 2));
    
    // Debug: check auth state
    const { data: sessionData } = await supabase.auth.getSession();
    console.log("Current auth session:", sessionData);
    
    if (!sessionData.session) {
      throw new Error("You must be logged in to create an account. Please sign in and try again.");
    }
    
    // Step 1: Insert the base account data
    console.log("Inserting base account data");
    const { data: accountData, error: accountError } = await supabase
      .from('accounts')
      .insert({
        name: data.name,
        type: data.type as Database["public"]["Enums"]["account_type"],
        username: data.username || null,
        url: data.url || null,
        password: data.savePassword && data.password ? data.password : null,
        project_id: data.projectId && data.projectId !== "none" ? parseInt(data.projectId) : null,
        owner_id: data.ownerId && data.ownerId !== "none" ? data.ownerId : null,
        renewal_date: data.expiryDate || null
      })
      .select('id')
      .single();

    if (accountError) {
      console.error("Error creating account:", accountError);
      throw new Error(`Failed to create account: ${accountError.message}`);
    }

    if (!accountData) {
      console.error("No account data returned");
      throw new Error("Failed to create account: No data returned");
    }

    const accountId = accountData.id;
    console.log("Account created with ID:", accountId);

    // Step 2: Insert type-specific data based on account type
    if (data.type === "Domain" && (data.hostedOn || data.renewalCost !== undefined)) {
      console.log("Inserting domain details");
      const { error: domainError } = await supabase
        .from('account_domains')
        .insert({
          account_id: accountId,
          hosted_on: data.hostedOn || null,
          renewal_cost: data.renewalCost || null
        });

      if (domainError) {
        console.error("Error creating domain details:", domainError);
        throw new Error(`Failed to create domain details: ${domainError.message}`);
      }
    }

    if (data.type === "SocialMedia" && data.platform) {
      console.log("Inserting social media details");
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
        throw new Error(`Failed to create social media details: ${socialMediaError.message}`);
      }
    }

    if (data.type === "Service" && data.monthlyCost !== undefined) {
      console.log("Inserting service details");
      const { error: serviceError } = await supabase
        .from('account_services')
        .insert({
          account_id: accountId,
          monthly_cost: data.monthlyCost || null
        });

      if (serviceError) {
        console.error("Error creating service details:", serviceError);
        throw new Error(`Failed to create service details: ${serviceError.message}`);
      }
    }

    return accountId;
  } catch (error) {
    console.error("Error in createAccount:", error);
    throw error;
  }
};
