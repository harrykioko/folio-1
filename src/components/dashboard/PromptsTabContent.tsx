
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Sparkles, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPrompts } from "@/utils/prompts";

const PromptsTabContent: React.FC = () => {
  const { data: prompts, isLoading, error } = useQuery({
    queryKey: ['prompts'],
    queryFn: fetchPrompts
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading prompts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-500 mb-4">Failed to load prompts</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try again
        </Button>
      </div>
    );
  }

  if (!prompts || prompts.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recently Added Prompts</h2>
          <Button size="sm" asChild>
            <Link to="/prompts/new">
              <Plus className="mr-2 h-4 w-4" />
              New Prompt
            </Link>
          </Button>
        </div>
        
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No prompts have been added yet</p>
          <Button asChild>
            <Link to="/prompts/new">
              <Plus className="mr-2 h-4 w-4" />
              Create your first prompt
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Take only the 4 most recent prompts
  const recentPrompts = prompts.slice(0, 4);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recently Added Prompts</h2>
        <Button size="sm" asChild>
          <Link to="/prompts/new">
            <Plus className="mr-2 h-4 w-4" />
            New Prompt
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {recentPrompts.map((prompt) => (
          <Card key={prompt.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{prompt.name || "Untitled Prompt"}</CardTitle>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <CardDescription className="flex items-center gap-2 text-xs">
                {prompt.tags && prompt.tags.length > 0 ? (
                  <Badge variant="outline" className="text-xs">{prompt.tags[0]}</Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">No tags</Badge>
                )}
                <span>•</span>
                <span>{prompt.project_id ? `Project #${prompt.project_id}` : "No project"}</span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-2 flex justify-between">
              <Badge variant="secondary">
                Created: {new Date(prompt.created_at).toLocaleDateString()}
              </Badge>
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/prompts/${prompt.id}`}>View</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PromptsTabContent;
