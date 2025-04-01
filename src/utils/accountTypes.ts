
// Type definitions for accounts
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

// Available account types
export const accountTypes = [
  { id: "domain", name: "Domain" },
  { id: "github", name: "GitHub" },
  { id: "twitter", name: "Twitter" },
  { id: "instagram", name: "Instagram" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "service", name: "Service/Platform" }
];
