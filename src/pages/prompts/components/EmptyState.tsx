
import React from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

interface EmptyStateProps {
  clearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ clearFilters }) => {
  return (
    <div className="text-center py-10">
      <Lightbulb className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
      <p className="text-muted-foreground">No prompts found matching your search or filters</p>
      <Button variant="link" onClick={clearFilters}>
        Clear all filters
      </Button>
    </div>
  );
};

export default EmptyState;
