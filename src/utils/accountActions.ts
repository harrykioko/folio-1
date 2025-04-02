
import { toast } from "@/hooks/use-toast";
import { accountsData } from './accountData';

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
