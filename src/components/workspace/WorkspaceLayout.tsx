
import React, { useState } from "react";
import { ChatPanel } from "./chat/ChatPanel";
import { ContextPanel } from "./context/ContextPanel";
import { motion } from "framer-motion";
import PageHeader from "../ui/page-header";
import { Logo } from "@/components/ui/logo";

export const WorkspaceLayout: React.FC = () => {
  const [activePanelContext, setActivePanelContext] = useState<string | null>(null);
  
  const handleActionClick = (action: string) => {
    console.log("Action clicked:", action);
    setActivePanelContext(action);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader 
        heading="AI Workspace"
        subheading="Ask anything about your projects, tasks, or prompts"
        icon={<Logo showText={false} size="sm" className="mr-2" />}
      />
      
      <motion.div 
        className="flex flex-col h-[calc(100vh-8rem)] md:flex-row md:space-x-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChatPanel onActionClick={handleActionClick} />
        <ContextPanel />
      </motion.div>
    </div>
  );
};
