
import { toast } from "@/hooks/use-toast";

// Type definitions
export interface Account {
  id: number;
  name: string;
  type: string;
  url: string;
  username: string;
  password: string;
  notes?: string;
  expiryDate?: string;
  projectId?: number;
  projectName?: string;
}

export const accountTypes = [
  { id: "domain", name: "Domain" },
  { id: "github", name: "GitHub" },
  { id: "twitter", name: "Twitter" },
  { id: "instagram", name: "Instagram" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "service", name: "Service/Platform" }
];

// Mock data for projects (in a real app this would come from an API)
export const projects = [
  { id: 1, name: "Project Alpha" },
  { id: 2, name: "Dashboard X" },
  { id: 3, name: "LMS Portal" },
  { id: 4, name: "Data Visualizer" },
  { id: 5, name: "Analytics Engine" }
];

// Sample account data (in a real app this would come from an API)
export const accountsData: Account[] = [
  { 
    id: 1, 
    name: "Project Alpha Website", 
    type: "domain",
    url: "https://alpha-project.com", 
    username: "admin", 
    password: "password123",
    notes: "Main website for Project Alpha. Renewal handled by IT department.",
    expiryDate: "2023-12-15",
    projectId: 1,
    projectName: "Project Alpha"
  },
  { 
    id: 2, 
    name: "Project Alpha GitHub", 
    type: "github",
    url: "https://github.com/org/project-alpha", 
    username: "developer", 
    password: "github_pass",
    notes: "Main repository for project code. All team members have access.",
    expiryDate: null,
    projectId: 1,
    projectName: "Project Alpha"
  }
];

// Utility function to get icon based on account type
export const getTypeIcon = (type: string) => {
  switch (type) {
    case 'domain':
      return 'Globe';
    case 'github':
      return 'Github';
    case 'twitter':
      return 'Twitter';
    case 'instagram':
      return 'Instagram';
    case 'linkedin':
      return 'Linkedin';
    case 'service':
      return 'AtSign';
    default:
      return 'Bookmark';
  }
};

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
  return accountsData.find(a => a.id === parseInt(accountId));
};
