
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { SuggestedActions } from "./SuggestedActions";

export const ChatPanel: React.FC<{ onActionClick?: (action: string) => void }> = ({ 
  onActionClick 
}) => {
  return (
    <motion.div 
      className="w-full md:w-2/5 h-full flex flex-col bg-card rounded-lg shadow-lg overflow-hidden mr-4"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1 overflow-y-auto p-4">
        {/* Chat messages will appear here */}
        <div className="flex items-start mb-4">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
            <span className="text-primary text-sm">AI</span>
          </div>
          <div className="bg-secondary rounded-lg p-3 max-w-[85%]">
            <p className="text-sm">Welcome to the Folio Workspace! How can I help you today?</p>
            <span className="text-xs text-muted-foreground">2:45 PM</span>
          </div>
        </div>
      </div>
      
      <SuggestedActions onActionClick={onActionClick} />
      
      <div className="p-4 border-t">
        <div className="flex">
          <Input 
            className="flex-1 mr-2" 
            placeholder="Ask anything..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                console.log("Message sent");
              }
            }}
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
