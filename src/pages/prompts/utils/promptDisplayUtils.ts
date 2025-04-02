
import { Prompt } from "@/utils/supabasePrompts";

// Calculate display category based on content keywords
export const getPromptCategory = (prompt: Prompt): string => {
  if (prompt.content.toLowerCase().includes("marketing")) return "Marketing";
  if (prompt.content.toLowerCase().includes("development")) return "Development";
  if (prompt.content.toLowerCase().includes("content")) return "Content";
  if (prompt.content.toLowerCase().includes("social")) return "Social Media";
  if (prompt.content.toLowerCase().includes("support")) return "Support";
  return "Other";
};

// Determine effectiveness based on content length
export const getPromptEffectiveness = (prompt: Prompt): string => {
  if (prompt.content.length > 500) return "High";
  if (prompt.content.length > 200) return "Medium";
  return "Low";
};

// Helper function to copy prompt to clipboard
export const copyPromptToClipboard = (content: string): void => {
  navigator.clipboard.writeText(content);
};
