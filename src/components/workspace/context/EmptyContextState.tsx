
import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyContextStateProps {
  onActionClick?: (action: string) => void;
}

export const EmptyContextState: React.FC<EmptyContextStateProps> = ({
  onActionClick = () => {},
}) => {
  const helpfulHints = [
    "Ask me to summarize a project",
    "Search for a prompt or generate a new one",
    "Create a new task or assign teammates"
  ];

  const suggestedActions = [
    { icon: "ListTodo", label: "Create task", action: "Create a new task" },
    { icon: "FolderOpen", label: "Open project", action: "Show me a list of projects" },
    { icon: "FileEdit", label: "New prompt", action: "Create a new prompt" },
    { icon: "FileText", label: "Meeting notes", action: "Draft meeting notes" },
  ];

  // Map icon string to component
  const getIcon = (icon: string) => {
    switch (icon) {
      case "ListTodo":
        return <i className="i-lucide-list-todo" />;
      case "FolderOpen":
        return <i className="i-lucide-folder-open" />;
      case "FileEdit":
        return <i className="i-lucide-file-edit" />;
      case "FileText":
        return <i className="i-lucide-file-text" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative w-24 h-24 mx-auto mb-6">
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-full animate-pulse-glow" />
          <Search className="absolute inset-0 m-auto h-12 w-12 text-primary" />
        </div>
        
        <h2 className="text-2xl font-semibold mb-2">Current Context</h2>
        <p className="text-muted-foreground mb-6">
          Use the chat or suggested actions below to get started:
        </p>
      </motion.div>

      <motion.ul 
        className="text-left mb-8 space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {helpfulHints.map((hint, index) => (
          <motion.li
            key={index}
            className="flex items-center text-muted-foreground"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
          >
            <span className="text-primary mr-2">•</span> {hint}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        className="grid grid-cols-2 gap-3 w-full max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        {suggestedActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex items-center justify-center h-14 p-4 hover:scale-105 transition-transform"
            onClick={() => onActionClick(action.action)}
          >
            {getIcon(action.icon)}
            <span className="ml-2">{action.label}</span>
          </Button>
        ))}
      </motion.div>
    </div>
  );
};
