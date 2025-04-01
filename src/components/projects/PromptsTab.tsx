
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { promptsData } from "@/utils/promptUtils";

interface PromptsTabProps {
  projectId: number;
}

const PromptsTab: React.FC<PromptsTabProps> = ({ projectId }) => {
  const navigate = useNavigate();
  const prompts = promptsData.filter(prompt => prompt.projectId === projectId);

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case "High": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-red-500";
      default: return "bg-slate-500";
    }
  };

  const handleAddPrompt = () => {
    navigate(`/prompts/new?projectId=${projectId}`);
  };

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
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Effectiveness</TableHead>
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
                <TableCell className="font-medium">{prompt.title}</TableCell>
                <TableCell>{prompt.category}</TableCell>
                <TableCell>
                  <Badge className={getEffectivenessColor(prompt.effectiveness)}>
                    {prompt.effectiveness}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {prompt.tags.slice(0, 2).map((tag, idx) => (
                      <Badge key={idx} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                    {prompt.tags.length > 2 && (
                      <Badge variant="outline">+{prompt.tags.length - 2}</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{prompt.dateCreated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PromptsTab;
