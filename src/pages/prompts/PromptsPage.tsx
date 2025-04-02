import React, { useState, useEffect } from "react";
import { fetchPrompts, Prompt } from "@/utils/prompts";
import { toast } from "@/hooks/use-toast";
import PromptHeader from "./components/PromptHeader";
import PromptFilters from "./components/PromptFilters";
import PromptTabs from "./components/PromptTabs";
import EmptyState from "./components/EmptyState";
import { Loader2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const PromptsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        setLoading(true);
        const data = await fetchPrompts();
        setPrompts(data);
        setError(null);
      } catch (err) {
        console.error("Error loading prompts:", err);
        setError("Failed to load prompts");
        toast({
          title: "Error",
          description: "Failed to load prompts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPrompts();
  }, []);

  const allCategories = Array.from(
    new Set(
      prompts.map(p => 
        p.content.toLowerCase().includes("marketing") ? "Marketing" :
        p.content.toLowerCase().includes("development") ? "Development" :
        p.content.toLowerCase().includes("content") ? "Content" :
        p.content.toLowerCase().includes("social") ? "Social Media" :
        p.content.toLowerCase().includes("support") ? "Support" :
        "Other"
      )
    )
  );

  const allTags = Array.from(
    new Set(
      prompts.flatMap(p => p.tags || [])
    )
  );

  const filteredPrompts = prompts.filter(prompt => {
    const promptCategory = 
      prompt.content.toLowerCase().includes("marketing") ? "Marketing" :
      prompt.content.toLowerCase().includes("development") ? "Development" :
      prompt.content.toLowerCase().includes("content") ? "Content" :
      prompt.content.toLowerCase().includes("social") ? "Social Media" :
      prompt.content.toLowerCase().includes("support") ? "Support" :
      "Other";
      
    const matchesSearch = 
      (prompt.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prompt.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || promptCategory === selectedCategory;
    
    const matchesTags = selectedTags.length === 0 || 
      (prompt.tags && selectedTags.every(tag => prompt.tags.includes(tag)));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <PromptHeader />
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <PromptHeader />
        <div className="bg-card rounded-md p-8 flex flex-col items-center justify-center">
          <Lightbulb className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PromptHeader />

      <PromptFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        clearFilters={clearFilters}
        allCategories={allCategories}
        allTags={allTags}
      />

      {filteredPrompts.length > 0 ? (
        <PromptTabs 
          prompts={filteredPrompts} 
          allPrompts={prompts.length}
        />
      ) : (
        <EmptyState clearFilters={clearFilters} />
      )}
    </div>
  );
};

export default PromptsPage;
