
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { SuggestedActions } from "./SuggestedActions";

type Message = {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Welcome to Folio Workspace! How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I understand you're asking about "${inputValue}". Let me help you with that.`,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div 
      className="glassmorphism w-full md:w-2/5 flex flex-col h-full rounded-lg shadow-lg overflow-hidden"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b bg-background/20 backdrop-blur-sm">
        <h2 className="text-lg font-semibold">AI Workspace</h2>
        <p className="text-sm text-muted-foreground">Ask anything about your projects</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>AI is thinking...</span>
          </div>
        )}
      </div>
      
      <SuggestedActions />
      
      <div className="p-4 border-t bg-background/20 backdrop-blur-sm">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
