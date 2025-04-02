
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PromptDetail from "@/components/prompts/PromptDetail";
import PromptForm from "@/components/prompts/PromptForm";
import { fetchPromptById } from "@/utils/prompts/queries";
import { updatePrompt, deletePrompt } from "@/utils/prompts/mutations";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PromptDetails: React.FC = () => {
  const { promptId } = useParams<{ promptId: string }>();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState<{id: string; name: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        setLoading(true);
        if (promptId) {
          // Fetch prompt details from Supabase
          const fetchedPrompt = await fetchPromptById(Number(promptId));
          if (fetchedPrompt) {
            // Convert to UI-friendly format
            setPrompt({
              id: fetchedPrompt.id,
              title: fetchedPrompt.name, // Map the name field to title for form
              category: fetchedPrompt.content.includes("marketing") ? "Marketing" : 
                        fetchedPrompt.content.includes("content") ? "Content" : "Development",
              description: fetchedPrompt.description || "Generated prompt", // Use description from database
              prompt: fetchedPrompt.content,
              effectiveness: "Medium",
              dateCreated: fetchedPrompt.created_at,
              projectId: fetchedPrompt.project_id,
              projectName: null, // Will be set if applicable
              tags: fetchedPrompt.tags || [],
            });
          } else {
            toast({
              title: "Prompt not found",
              description: "The requested prompt could not be found.",
              variant: "destructive",
            });
            navigate("/prompts");
          }
        }

        // Fetch projects for the dropdown
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('id, name');
        
        if (projectsError) {
          console.error("Error fetching projects:", projectsError);
        } else if (projectsData) {
          setProjects(projectsData.map(project => ({
            id: project.id.toString(),
            name: project.name
          })));
        }
      } catch (error) {
        console.error("Error fetching prompt:", error);
        toast({
          title: "Error",
          description: "There was an error loading the prompt. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [promptId, navigate]);

  const handleEditSubmit = async (values: any) => {
    try {
      if (!promptId) return;
      
      // Format values for update
      const updates = {
        name: values.title, // Map title from form to name in database
        content: values.prompt,
        description: values.description,
        tags: values.tags || [],
        project_id: values.projectId ? Number(values.projectId) : null
      };
      
      // Update the prompt in Supabase
      const updatedPrompt = await updatePrompt(Number(promptId), updates);
      
      // Update local state with new values
      setPrompt({
        ...prompt,
        title: updatedPrompt.name,
        description: updatedPrompt.description || "No description provided",
        prompt: updatedPrompt.content,
        tags: updatedPrompt.tags || [],
        projectId: updatedPrompt.project_id
      });
      
      setIsEditing(false);
      toast({
        title: "Prompt updated",
        description: "The prompt has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating prompt:", error);
      toast({
        title: "Error",
        description: "There was an error updating the prompt. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (!promptId) return;
      
      // Delete the prompt from Supabase
      await deletePrompt(Number(promptId));
      
      toast({
        title: "Prompt deleted",
        description: "The prompt has been deleted successfully.",
      });
      navigate("/prompts");
    } catch (error) {
      console.error("Error deleting prompt:", error);
      toast({
        title: "Error",
        description: "There was an error deleting the prompt. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (!prompt) {
    return <div className="flex items-center justify-center h-64">Prompt not found</div>;
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Edit Prompt</h1>
          <button 
            onClick={() => setIsEditing(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
        <PromptForm
          defaultValues={{
            title: prompt.title || "Untitled Prompt",
            category: prompt.category,
            description: prompt.description,
            prompt: prompt.prompt,
            effectiveness: prompt.effectiveness,
            projectId: prompt.projectId ? String(prompt.projectId) : undefined,
            tags: prompt.tags,
          }}
          onSubmit={handleEditSubmit}
          isEditing={true}
          projects={projects}
        />
      </div>
    );
  }

  return (
    <PromptDetail
      prompt={prompt}
      onDelete={handleDelete}
      onEditClick={() => setIsEditing(true)}
    />
  );
};

export default PromptDetails;
