
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Copy,
  MoreHorizontal,
  Sparkles,
  Code
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Prompt } from "@/utils/prompts";
import { getPromptCategory, getPromptEffectiveness, copyPromptToClipboard } from "../utils/promptDisplayUtils";
import { toast } from "@/hooks/use-toast";

interface PromptListViewProps {
  prompts: Prompt[];
}

const PromptListView: React.FC<PromptListViewProps> = ({ prompts }) => {
  const handleCopy = (content: string) => {
    copyPromptToClipboard(content);
    toast({
      title: "Copied to clipboard",
      description: "Prompt content has been copied to your clipboard",
    });
  };

  return (
    <Card>
      {prompts.map((prompt, index) => {
        const promptCategory = getPromptCategory(prompt);
        const promptEffectiveness = getPromptEffectiveness(prompt);
          
        return (
          <React.Fragment key={prompt.id}>
            {index > 0 && <div className="border-t mx-4"></div>}
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{prompt.name || "Untitled Prompt"}</h3>
                    <Badge variant="secondary">{promptCategory}</Badge>
                    <Badge 
                      variant={
                        promptEffectiveness === "High" ? "default" : 
                        promptEffectiveness === "Medium" ? "outline" : "secondary"
                      }
                      className="flex items-center gap-1"
                    >
                      <Sparkles className="h-3 w-3" />
                      {promptEffectiveness}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{prompt.content.substring(0, 100)}...</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {(prompt.tags || []).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleCopy(prompt.content)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/prompts/${prompt.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/prompts/${prompt.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleCopy(prompt.content)}>
                        Copy Prompt
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Export as JSON
                      </DropdownMenuItem>
                      {prompt.project_id && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to={`/projects/${prompt.project_id}`}>
                              Go to Project #{prompt.project_id}
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="mt-3 bg-secondary/50 rounded-md p-3 text-sm font-mono relative">
                <Code className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <p className="pr-6 line-clamp-2">{prompt.content}</p>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </Card>
  );
};

export default PromptListView;
