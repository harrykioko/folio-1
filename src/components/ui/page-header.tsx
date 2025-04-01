
import React from "react";

interface PageHeaderProps {
  heading: string;
  subheading?: string;
  children?: React.ReactNode;
}

const PageHeader = ({ heading, subheading, children }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-1 pb-4">
      <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
      {subheading && (
        <p className="text-muted-foreground">{subheading}</p>
      )}
      {children}
    </div>
  );
};

export default PageHeader;
