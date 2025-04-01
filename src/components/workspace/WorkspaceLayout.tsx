
import React from "react";
import { ChatPanel } from "./chat/ChatPanel";
import { ContextPanel } from "./context/ContextPanel";
import { motion } from "framer-motion";

export const WorkspaceLayout: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col h-[calc(100vh-8rem)] md:flex-row md:space-x-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChatPanel />
      <ContextPanel />
    </motion.div>
  );
};
