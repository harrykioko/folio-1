
import { Prompt } from "@/utils/prompts";
import { toast } from "@/hooks/use-toast";

// Function to determine prompt category based on content
export const getPromptCategory = (prompt: Prompt): string => {
  if (prompt.content.toLowerCase().includes("marketing")) return "Marketing";
  if (prompt.content.toLowerCase().includes("development")) return "Development";
  if (prompt.content.toLowerCase().includes("content")) return "Content";
  if (prompt.content.toLowerCase().includes("social")) return "Social Media";
  if (prompt.content.toLowerCase().includes("support")) return "Support";
  return "Other";
};

// Function to determine prompt effectiveness (simplified)
export const getPromptEffectiveness = (prompt: Prompt): string => {
  // This is a placeholder - in a real app, this might be based on user ratings or other metrics
  const length = prompt.content.length;
  if (length > 300) return "High";
  if (length > 150) return "Medium";
  return "Low";
};

// Function to copy prompt content to clipboard
export const copyPromptToClipboard = (content: string): void => {
  navigator.clipboard.writeText(content).catch(err => {
    console.error('Failed to copy text: ', err);
    toast({
      title: "Copy failed",
      description: "Could not copy to clipboard. Please try again.",
      variant: "destructive",
    });
  });
};
