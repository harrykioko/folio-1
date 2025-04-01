
import { Account } from './accountTypes';

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
