
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const PromptHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Prompt Library</h1>
      <Button asChild>
        <Link to="/prompts/new">
          <Plus className="mr-2 h-4 w-4" />
          New Prompt
        </Link>
      </Button>
    </div>
  );
};

export default PromptHeader;
