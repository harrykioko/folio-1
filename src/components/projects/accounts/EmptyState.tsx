
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddAccount: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddAccount }) => {
  return (
    <div className="text-center py-10 text-muted-foreground">
      <p>No accounts have been linked to this project yet.</p>
      <Button variant="outline" className="mt-4" onClick={onAddAccount}>
        <Plus className="mr-2 h-4 w-4" />
        Add Account
      </Button>
    </div>
  );
};

export default EmptyState;
