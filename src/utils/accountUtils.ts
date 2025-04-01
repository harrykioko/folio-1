
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
  },
  { 
    id: 3, 
    name: "Project Alpha Twitter", 
    type: "twitter",
    url: "https://twitter.com/projectalpha", 
    username: "projectalpha", 
    password: "twitter_pass",
    notes: "Social media account for Project Alpha.",
    expiryDate: null,
    projectId: 1,
    projectName: "Project Alpha"
  },
  { 
    id: 4, 
    name: "Dashboard X Website", 
    type: "domain",
    url: "https://dashboardx.io", 
    username: "admin", 
    password: "dashboardx_admin",
    notes: "Dashboard X main domain. Annual renewal.",
    expiryDate: "2024-03-22",
    projectId: 2,
    projectName: "Dashboard X"
  },
  { 
    id: 5, 
    name: "LMS Portal Primary Domain", 
    type: "domain",
    url: "https://learn-portal.com", 
    username: "admin", 
    password: "lms_admin123",
    notes: "Primary domain for the LMS Portal.",
    expiryDate: "2023-10-05",
    projectId: 3,
    projectName: "LMS Portal"
  },
  { 
    id: 6, 
    name: "LMS Portal GitHub", 
    type: "github",
    url: "https://github.com/org/lms-portal", 
    username: "developer", 
    password: "lms_github",
    notes: "Code repository for LMS Portal.",
    expiryDate: null,
    projectId: 3,
    projectName: "LMS Portal"
  },
  { 
    id: 7, 
    name: "LMS Portal Instagram", 
    type: "instagram",
    url: "https://instagram.com/lmsportal", 
    username: "lmsportal", 
    password: "instagram_lms",
    notes: "Instagram account for LMS Portal.",
    expiryDate: null,
    projectId: 3,
    projectName: "LMS Portal"
  },
  { 
    id: 8, 
    name: "Analytics Engine LinkedIn", 
    type: "linkedin",
    url: "https://linkedin.com/company/analytics-engine", 
    username: "analytics-engine", 
    password: "linkedin_analytics",
    notes: "LinkedIn company page for Analytics Engine.",
    expiryDate: null,
    projectId: 5,
    projectName: "Analytics Engine"
  },
  { 
    id: 9, 
    name: "Email Marketing Service", 
    type: "service",
    url: "https://emailprovider.com", 
    username: "marketing@company.com", 
    password: "email_marketing",
    notes: "Email marketing platform subscription.",
    expiryDate: "2024-02-01",
    projectId: null,
    projectName: null
  },
  { 
    id: 10, 
    name: "Cloud Hosting Account", 
    type: "service",
    url: "https://cloudprovider.com", 
    username: "admin@company.com", 
    password: "cloud_admin",
    notes: "Cloud hosting account for multiple projects.",
    expiryDate: "2024-01-15",
    projectId: null,
    projectName: null
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
