
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Loader2 } from "lucide-react";
import { fetchPromptsByProjectId, Prompt } from "@/utils/prompts";
import { toast } from "sonner";

interface PromptsTabProps {
  projectId: number;
}

const PromptsTab: React.FC<PromptsTabProps> = ({ projectId }) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);
        const promptsData = await fetchPromptsByProjectId(projectId);
        setPrompts(promptsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching prompts:", err);
        setError("Failed to load prompts for this project");
        toast.error("Failed to load prompts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [projectId]);

  const handleAddPrompt = () => {
    navigate(`/prompts/new?projectId=${projectId}`);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Prompt Library</CardTitle>
            <Button disabled>
              <Plus className="mr-2 h-4 w-4" />
              Add Prompt
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Prompt Library</CardTitle>
            <Button onClick={handleAddPrompt}>
              <Plus className="mr-2 h-4 w-4" />
              Add Prompt
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-muted-foreground">
            <p>{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (prompts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Prompt Library</CardTitle>
            <Button onClick={handleAddPrompt}>
              <Plus className="mr-2 h-4 w-4" />
              Add Prompt
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-muted-foreground">
            <p>No prompts have been added to this project yet.</p>
            <Button variant="outline" className="mt-4" onClick={handleAddPrompt}>
              <Plus className="mr-2 h-4 w-4" />
              Add Prompt
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Prompt Library</CardTitle>
          <Button onClick={handleAddPrompt}>
            <Plus className="mr-2 h-4 w-4" />
            Add Prompt
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prompts.map((prompt) => (
              <TableRow 
                key={prompt.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/prompts/${prompt.id}`)}
              >
                <TableCell className="font-medium">
                  {prompt.name || "Untitled Prompt"}
                </TableCell>
                <TableCell>
                  {prompt.content.length > 100 
                    ? `${prompt.content.substring(0, 100)}...` 
                    : prompt.content}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {prompt.tags && prompt.tags.length > 0 ? (
                      <>
                        {prompt.tags.slice(0, 2).map((tag, idx) => (
                          <Badge key={idx} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                        {prompt.tags.length > 2 && (
                          <Badge variant="outline">+{prompt.tags.length - 2}</Badge>
                        )}
                      </>
                    ) : (
                      <span className="text-muted-foreground">No tags</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(prompt.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PromptsTab;
