
import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  linkTo?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = "md",
  linkTo = "/dashboard"
}) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10"
  };

  const logo = (
    <img 
      src="/lovable-uploads/143cb188-cc01-4f31-ab7f-685cba076570.png" 
      alt="Folio Logo" 
      className={cn(sizeClasses[size], "w-auto", className)}
    />
  );

  return linkTo ? (
    <Link to={linkTo} className="flex items-center">
      {logo}
    </Link>
  ) : (
    logo
  );
};
