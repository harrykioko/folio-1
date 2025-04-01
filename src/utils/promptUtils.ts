
import { toast } from "@/hooks/use-toast";

// Sample data for prompts
export const promptsData = [
  {
    id: 1,
    title: "SEO Content Generator",
    category: "Content",
    description: "Generates SEO-optimized blog content based on keywords and topic",
    effectiveness: "High",
    dateCreated: "2023-08-15",
    projectId: 1,
    projectName: "Project Alpha",
    tags: ["content", "marketing", "seo"],
    prompt: "Write an SEO-optimized blog post about [TOPIC] that includes the following keywords: [KEYWORDS]. Structure the content with H2 and H3 headings, and include a compelling introduction and conclusion."
  },
  {
    id: 2,
    title: "Product Feature Summary",
    category: "Marketing",
    description: "Creates concise product feature summaries for marketing materials",
    effectiveness: "Medium",
    dateCreated: "2023-09-03",
    projectId: 2,
    projectName: "Dashboard X",
    tags: ["product", "features", "marketing"],
    prompt: "Create a concise summary of the following product feature: [FEATURE]. The summary should be no more than 3 sentences, highlight the key benefit, and be suitable for marketing materials."
  },
  {
    id: 3,
    title: "Customer Support Response Template",
    category: "Support",
    description: "Generates friendly customer support responses for common issues",
    effectiveness: "High",
    dateCreated: "2023-07-22",
    projectId: 3,
    projectName: "LMS Portal",
    tags: ["support", "customer service", "templates"],
    prompt: "Draft a friendly and helpful customer support response to address the following issue: [ISSUE]. The response should empathize with the customer, provide a clear solution, and include follow-up steps if necessary."
  },
  {
    id: 4,
    title: "Bug Report Analysis",
    category: "Development",
    description: "Analyzes bug reports and suggests potential solutions",
    effectiveness: "Medium",
    dateCreated: "2023-09-18",
    projectId: null,
    projectName: null,
    tags: ["bugs", "development", "analysis"],
    prompt: "Analyze the following bug report and suggest potential causes and solutions: [BUG REPORT]. Include questions that might help further diagnose the issue and steps to reproduce for verification."
  },
  {
    id: 5,
    title: "Weekly Report Generator",
    category: "Reporting",
    description: "Creates structured weekly progress reports",
    effectiveness: "High",
    dateCreated: "2023-08-30",
    projectId: 1,
    projectName: "Project Alpha",
    tags: ["reporting", "weekly", "progress"],
    prompt: "Generate a comprehensive weekly progress report for the period [DATE RANGE] with the following metrics and achievements: [METRICS]. Structure the report with sections for accomplishments, challenges, upcoming work, and resource needs."
  },
  {
    id: 6,
    title: "Social Media Post Ideas",
    category: "Social Media",
    description: "Generates creative social media post ideas for various platforms",
    effectiveness: "Medium",
    dateCreated: "2023-09-25",
    projectId: 5,
    projectName: "Analytics Engine",
    tags: ["social media", "content", "marketing"],
    prompt: "Generate 5 creative social media post ideas for [PLATFORM] focusing on [TOPIC/PRODUCT]. Each idea should include a suggested caption, hashtags, and description of visual content. Tailor the tone to match our brand voice which is [BRAND VOICE]."
  },
  {
    id: 7,
    title: "UI Error Message Suggestions",
    category: "UX/UI",
    description: "Creates user-friendly error messages for different UI scenarios",
    effectiveness: "High",
    dateCreated: "2023-08-05",
    projectId: 2,
    projectName: "Dashboard X",
    tags: ["ui", "ux", "error messages"],
    prompt: "Create user-friendly error messages for the following scenarios in our application: [SCENARIOS]. Each message should be concise, helpful, non-technical for end-users, and include a suggestion for how to resolve the issue."
  },
  {
    id: 8,
    title: "Feature Requirement Specification",
    category: "Development",
    description: "Expands feature ideas into detailed technical requirements",
    effectiveness: "High",
    dateCreated: "2023-07-15",
    projectId: 3,
    projectName: "LMS Portal",
    tags: ["development", "requirements", "specification"],
    prompt: "Expand the following feature idea into a detailed software requirement specification: [FEATURE IDEA]. Include functional requirements, technical considerations, potential API endpoints, data models, and user interface elements."
  }
];

// Get all prompts
export const getPrompts = () => {
  return promptsData;
};

// Get a prompt by ID
export const getPromptById = (id: number) => {
  const prompt = promptsData.find(p => p.id === id);
  return prompt || null;
};

// Create a new prompt (mock implementation)
export const createPrompt = (promptData: any) => {
  const newId = Math.max(...promptsData.map(p => p.id)) + 1;
  const newPrompt = {
    id: newId,
    dateCreated: new Date().toISOString(),
    ...promptData
  };
  
  // In a real app, this would make an API call
  // For now, we'll just log it
  console.log("Creating new prompt:", newPrompt);
  
  return newPrompt;
};

// Update an existing prompt (mock implementation)
export const updatePrompt = (id: number, promptData: any) => {
  // In a real app, this would make an API call
  // For now, we'll just log it
  console.log(`Updating prompt with ID ${id}:`, promptData);
  
  return {
    id,
    ...promptData
  };
};

// Delete a prompt (mock implementation)
export const deletePrompt = (id: number) => {
  // In a real app, this would make an API call
  // For now, we'll just log it
  console.log(`Deleting prompt with ID ${id}`);
  
  return true;
};

// Helper function to copy prompt to clipboard
export const copyPromptToClipboard = (promptText: string) => {
  navigator.clipboard.writeText(promptText);
  toast({
    title: "Copied to clipboard",
    description: "Prompt has been copied to your clipboard."
  });
};

// Get project options for select inputs
export const getProjectOptions = () => {
  const uniqueProjects = promptsData
    .filter(p => p.projectId !== null && p.projectName !== null)
    .reduce((acc: {id: number, name: string}[], curr) => {
      if (curr.projectId !== null && curr.projectName !== null && !acc.some(p => p.id === curr.projectId)) {
        acc.push({
          id: curr.projectId,
          name: curr.projectName
        });
      }
      return acc;
    }, []);
  
  return uniqueProjects;
};
