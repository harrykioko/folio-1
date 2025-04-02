
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Copy,
  Edit,
  Download,
  Sparkles,
  Tag,
  Trash2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export interface PromptDetailProps {
  prompt: {
    id: number;
    title: string;
    category: string;
    description: string;
    prompt: string;
    effectiveness: string;
    dateCreated: string;
    projectId: number | null;
    projectName: string | null;
    tags: string[];
  };
  onDelete: () => void;
  onEditClick: () => void;
}

const PromptDetail: React.FC<PromptDetailProps> = ({
  prompt,
  onDelete,
  onEditClick,
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.prompt);
    toast({
      title: "Copied to clipboard",
      description: "Prompt has been copied to your clipboard.",
    });
  };

  const downloadPrompt = () => {
    const promptData = JSON.stringify(prompt, null, 2);
    const blob = new Blob([promptData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${prompt.title.toLowerCase().replace(/\s+/g, "-")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({
      title: "Prompt downloaded",
      description: "The prompt has been downloaded as a JSON file.",
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this prompt? This action cannot be undone.")) {
      onDelete();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
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

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">{prompt.title}</CardTitle>
                  <Badge>{prompt.category}</Badge>
                </div>
                <CardDescription className="mt-1">
                  {prompt.description || "No description provided"}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onEditClick}>
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/50 rounded-md p-4 font-mono text-sm whitespace-pre-wrap">
              {prompt.prompt}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Created</h3>
                <p>{formatDate(prompt.dateCreated)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Effectiveness</h3>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>{prompt.effectiveness}</span>
                </div>
              </div>
              {prompt.projectName && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Project</h3>
                  <Link
                    to={`/projects/${prompt.projectId}`}
                    className="text-primary hover:underline"
                  >
                    {prompt.projectName}
                  </Link>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 gap-2">
            <Button variant="secondary" onClick={copyToClipboard}>
              <Copy className="mr-1 h-4 w-4" />
              Copy Prompt
            </Button>
            <Button variant="outline" onClick={downloadPrompt}>
              <Download className="mr-1 h-4 w-4" />
              Download JSON
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PromptDetail;
