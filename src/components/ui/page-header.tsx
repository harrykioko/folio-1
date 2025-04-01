
import React from "react";

interface PageHeaderProps {
  heading: string;
  subheading?: string;
  description?: string; // Added description prop
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const PageHeader = ({ heading, subheading, description, icon, children }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-1 pb-4">
      <div className="flex items-center gap-2">
        {icon}
        <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
      </div>
      {subheading && (
        <p className="text-muted-foreground">{subheading}</p>
      )}
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
};

export default PageHeader;
