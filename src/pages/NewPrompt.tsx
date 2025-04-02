
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PromptForm from "@/components/prompts/PromptForm";
import { createPrompt } from "@/utils/prompts";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const NewPrompt: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [projects, setProjects] = useState<{id: string; name: string}[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('id, name');
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setProjects(data.map(project => ({
            id: project.id.toString(),
            name: project.name
          })));
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects');
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      
      // Format the data for submission
      const promptData = {
        name: values.title, // Map title from form to name field in database
        content: values.prompt,
        description: values.description,
        tags: values.tags || [],
        project_id: values.projectId ? parseInt(values.projectId) : null
      };
      
      const newPrompt = await createPrompt(promptData);
      
      toast.success("Prompt created successfully");
      navigate(`/prompts/${newPrompt.id}`);
    } catch (error) {
      console.error("Error creating prompt:", error);
      toast.error("Failed to create prompt. Please try again.");
    } finally {
      setLoading(false);
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

      <PromptForm 
        onSubmit={handleSubmit} 
        projects={projects} 
        isSubmitting={loading}
        initialProjectId={projectId}
      />
    </div>
  );
};

export default NewPrompt;
