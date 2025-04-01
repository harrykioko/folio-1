
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Sparkles, User } from "lucide-react";

type MessageProps = {
  message: {
    id: string;
    type: "user" | "assistant";
    content: string;
    timestamp: Date;
  };
};

export const ChatMessage: React.FC<MessageProps> = ({ message }) => {
  const isAI = message.type === "assistant";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex space-x-3",
        isAI ? "items-start" : "items-start justify-end"
      )}
    >
      {isAI && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary/20 text-primary">
            <Sparkles className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "rounded-lg p-3 max-w-[80%]",
          isAI 
            ? "bg-muted text-foreground" 
            : "bg-primary text-primary-foreground"
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <div className="mt-1 text-xs opacity-70">
          {new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
          }).format(message.timestamp)}
        </div>
      </div>
      
      {!isAI && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
};
