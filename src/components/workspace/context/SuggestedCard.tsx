
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo, FileText, KeyRound, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

type SuggestedCardProps = {
  title: string;
  description: string;
  icon: string;
  onClick?: () => void;
};

export const SuggestedCard: React.FC<SuggestedCardProps> = ({
  title,
  description,
  icon,
  onClick = () => {},
}) => {
  // Map icon string to component
  const IconComponent = () => {
    switch (icon) {
      case "ListTodo":
        return <ListTodo className="h-8 w-8 text-primary" />;
      case "FileText":
        return <FileText className="h-8 w-8 text-primary" />;
      case "KeyRound":
        return <KeyRound className="h-8 w-8 text-primary" />;
      case "Calendar":
        return <Calendar className="h-8 w-8 text-primary" />;
      default:
        return <ListTodo className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <IconComponent />
            <span className="ml-2">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
          <div className="mt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClick}
              className="text-xs font-medium text-primary p-0 h-auto"
            >
              Continue →
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
