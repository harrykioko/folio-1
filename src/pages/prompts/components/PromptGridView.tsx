
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Tag, Sparkles } from "lucide-react";
import { Prompt } from "@/utils/prompts";
import { getPromptCategory, getPromptEffectiveness, copyPromptToClipboard } from "../utils/promptDisplayUtils";
import { toast } from "@/hooks/use-toast";

interface PromptGridViewProps {
  prompts: Prompt[];
}

const PromptGridView: React.FC<PromptGridViewProps> = ({ prompts }) => {
  const handleCopy = (content: string) => {
    copyPromptToClipboard(content);
    toast({
      title: "Copied to clipboard",
      description: "Prompt content has been copied to your clipboard",
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {prompts.map((prompt) => {
        const promptCategory = getPromptCategory(prompt);
        const promptEffectiveness = getPromptEffectiveness(prompt);
          
        return (
          <Card key={prompt.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-base line-clamp-1">
                  {prompt.name || "Untitled Prompt"}
                </CardTitle>
                <Badge variant="secondary">{promptCategory}</Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {prompt.content.substring(0, 100)}...
              </p>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-1 mb-2">
                {(prompt.tags || []).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Effectiveness: {promptEffectiveness}</span>
                </div>
                {prompt.project_id && (
                  <Link to={`/projects/${prompt.project_id}`} className="text-primary hover:underline text-xs">
                    Project #{prompt.project_id}
                  </Link>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground"
                onClick={() => handleCopy(prompt.content)}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/prompts/${prompt.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default PromptGridView;
