
import { SearchResult } from "./searchService";

// Mock projects data
export const mockProjects: SearchResult[] = [
  {
    id: 1,
    type: "project",
    title: "Project Alpha",
    description: "AI-powered content generation platform",
    status: "Active",
    progress: 75,
    tags: ["AI", "Content"]
  },
  {
    id: 2,
    type: "project",
    title: "Dashboard X",
    description: "Analytics dashboard for marketing teams",
    status: "In Progress",
    progress: 45,
    tags: ["Analytics", "Marketing"]
  },
  {
    id: 3,
    type: "project",
    title: "LMS Portal",
    description: "Learning management system",
    status: "Completed",
    progress: 100,
    tags: ["Education", "Portal"]
  },
  {
    id: 4,
    type: "project",
    title: "API Gateway",
    description: "Centralized API management solution",
    status: "Planning",
    progress: 15,
    tags: ["API", "Backend"]
  },
  {
    id: 5,
    type: "project",
    title: "Mobile App Refresh",
    description: "Redesign of the mobile experience",
    status: "On Hold",
    progress: 60,
    tags: ["Mobile", "Design"]
  }
];

// Mock tasks data
export const mockTasks: SearchResult[] = [
  {
    id: 1,
    type: "task",
    title: "Update project documentation",
    description: "Project Alpha",
    status: "In Progress",
    dueDate: "Tomorrow"
  },
  {
    id: 2,
    type: "task",
    title: "Review prompt library structure",
    description: "AI Tools",
    status: "Not Started",
    dueDate: "Today"
  },
  {
    id: 3,
    type: "task",
    title: "Implement API integration",
    description: "Dashboard X",
    status: "In Progress",
    dueDate: "Next week"
  },
  {
    id: 4,
    type: "task",
    title: "Design new user onboarding flow",
    description: "LMS Portal",
    status: "Completed",
    dueDate: "Yesterday"
  },
  {
    id: 5,
    type: "task",
    title: "Update GitHub repository access",
    description: "Project Alpha",
    status: "Blocked",
    dueDate: "Today"
  },
  {
    id: 6,
    type: "task",
    title: "Finish dashboard wireframes",
    description: "Dashboard X",
    status: "In Progress",
    dueDate: "Jan 3"
  }
];

// Mock prompts data
export const mockPrompts: SearchResult[] = [
  {
    id: 1,
    type: "prompt",
    title: "SEO Content Generator",
    description: "Generate SEO-optimized content for various topics and industries.",
    tags: ["Content", "SEO", "Marketing"]
  },
  {
    id: 2,
    type: "prompt",
    title: "Product Feature Summary",
    description: "Create concise summaries of product features for marketing materials.",
    tags: ["Product", "Marketing"]
  },
  {
    id: 3,
    type: "prompt",
    title: "Customer Response Template",
    description: "Generate professional responses to common customer inquiries.",
    tags: ["Customer Service", "Templates"]
  },
  {
    id: 4,
    type: "prompt",
    title: "Weekly Report Generator",
    description: "Create structured weekly progress reports for project stakeholders.",
    tags: ["Reports", "Project Management"]
  },
  {
    id: 5,
    type: "prompt",
    title: "Code Documentation Helper",
    description: "Generate comprehensive code documentation from function signatures and comments.",
    tags: ["Development", "Documentation"]
  }
];

// Mock accounts data
export const mockAccounts: SearchResult[] = [
  {
    id: 1,
    type: "account",
    title: "GitHub",
    description: "Version control and code hosting"
  },
  {
    id: 2,
    type: "account",
    title: "AWS",
    description: "Cloud infrastructure"
  },
  {
    id: 3,
    type: "account",
    title: "Vercel",
    description: "Frontend deployment"
  },
  {
    id: 4,
    type: "account",
    title: "Google Workspace",
    description: "Email and collaboration"
  },
  {
    id: 5,
    type: "account",
    title: "Twitter",
    description: "Social media"
  },
  {
    id: 6,
    type: "account",
    title: "Stripe",
    description: "Payment processing"
  }
];
