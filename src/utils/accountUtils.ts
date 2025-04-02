
// This file serves as a central export point for all account-related utilities
export * from './accountTypes';
export * from './projectData';
export * from './accountData';
export * from './accountActions';
export { TiktokIcon } from '../components/icons/TiktokIcon';

// Define icon utility functions directly in this file to avoid circular dependencies
import React from 'react';
import { 
  Globe, 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin, 
  AtSign, 
  Facebook,
  Database as DatabaseIcon,
} from "lucide-react";
import { TiktokIcon as TikTokIconComponent } from "../components/icons/TiktokIcon";

export const getTypeIcon = (type: string) => {
  switch (type) {
    case "Domain":
      return <Globe className="h-4 w-4" />;
    case "Repository":
      return <Github className="h-4 w-4" />;
    case "Email":
      return <AtSign className="h-4 w-4" />;
    case "Service":
      return <DatabaseIcon className="h-4 w-4" />;
    case "SocialMedia":
      // Default social media icon, specific platform icons are handled separately
      return <AtSign className="h-4 w-4" />;
    default:
      return <Globe className="h-4 w-4" />;
  }
};

export const getPlatformIcon = (platform?: string) => {
  if (!platform) return null;
  
  switch (platform) {
    case "Instagram":
      return <Instagram className="h-4 w-4" />;
    case "Facebook":
      return <Facebook className="h-4 w-4" />;
    case "LinkedIn":
      return <Linkedin className="h-4 w-4" />;
    case "Twitter":
      return <Twitter className="h-4 w-4" />;
    case "TikTok":
      return <TikTokIconComponent className="h-4 w-4" />;
    case "Pinterest":
      // Pinterest icon not available in lucide-react by default
      return <Globe className="h-4 w-4" />;
    default:
      return <AtSign className="h-4 w-4" />;
  }
};
