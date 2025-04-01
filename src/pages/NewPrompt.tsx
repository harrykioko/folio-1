
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PromptForm from "@/components/prompts/PromptForm";
import { createPrompt, getProjectOptions } from "@/utils/promptUtils";
import { toast } from "@/hooks/use-toast";

const NewPrompt: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<{id: string; name: string}[]>([]);

  useEffect(() => {
    // Fetch projects for the dropdown
    const projectOptions = getProjectOptions();
    setProjects(projectOptions);
  }, []);

  const handleSubmit = (values: any) => {
    try {
      const newPrompt = createPrompt(values);
      toast({
        title: "Prompt created",
        description: "Your new prompt has been created successfully.",
      });
      navigate(`/prompts/${newPrompt.id}`);
    } catch (error) {
      console.error("Error creating prompt:", error);
      toast({
        title: "Error",
        description: "There was an error creating the prompt. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild className="gap-1">
          <Link to="/prompts">
            <ArrowLeft className="h-4 w-4" />
            Back to Prompts
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold tracking-tight">Create New Prompt</h1>
      <p className="text-muted-foreground">
        Create a reusable prompt template for AI generation with customizable variables.
      </p>

      <PromptForm onSubmit={handleSubmit} projects={projects} />
    </div>
  );
};

export default NewPrompt;
