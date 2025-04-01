
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PromptDetail from "@/components/prompts/PromptDetail";
import PromptForm from "@/components/prompts/PromptForm";
import { getPromptById, updatePrompt, deletePrompt, getProjectOptions } from "@/utils/promptUtils";
import { toast } from "@/hooks/use-toast";

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
        if (promptId) {
          const fetchedPrompt = getPromptById(Number(promptId));
          if (fetchedPrompt) {
            setPrompt(fetchedPrompt);
          } else {
            toast({
              title: "Prompt not found",
              description: "The requested prompt could not be found.",
              variant: "destructive",
            });
            navigate("/prompts");
          }
        }
        const projectOptions = getProjectOptions();
        setProjects(projectOptions);
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

  const handleEditSubmit = (values: any) => {
    try {
      const updatedPrompt = updatePrompt(Number(promptId), values);
      setPrompt(updatedPrompt);
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

  const handleDelete = () => {
    try {
      deletePrompt(Number(promptId));
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
            title: prompt.title,
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
