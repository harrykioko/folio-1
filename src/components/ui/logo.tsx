
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  textClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  showText = true, 
  size = "md",
  textClassName
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
  };

  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/lovable-uploads/fab58717-50ce-43d5-b3e7-cb5bf5b92c0f.png" 
        alt="Folio Logo" 
        className={cn(sizeClasses[size])}
      />
      {showText && (
        <span className={cn("font-bold", textClassName, {
          "text-lg ml-2": size === "md",
          "text-base ml-1.5": size === "sm",
          "text-xl ml-2.5": size === "lg"
        })}>
          Folio
        </span>
      )}
    </div>
  );
};
