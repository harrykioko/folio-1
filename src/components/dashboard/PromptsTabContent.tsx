
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const PromptsTabContent: React.FC = () => {
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
        {[
          { id: 1, title: "SEO Content Generator", project: "Project Alpha", category: "Content", effectiveness: "High" },
          { id: 2, title: "Product Feature Summary", project: "Dashboard X", category: "Marketing", effectiveness: "Medium" },
          { id: 3, title: "Customer Response Template", project: "LMS Portal", category: "Support", effectiveness: "High" },
          { id: 4, title: "Weekly Report Generator", project: "Project Alpha", category: "Reporting", effectiveness: "High" }
        ].map((prompt) => (
          <Card key={prompt.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{prompt.title}</CardTitle>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <CardDescription className="flex items-center gap-2 text-xs">
                <Badge variant="outline" className="text-xs">{prompt.category}</Badge>
                <span>•</span>
                <span>{prompt.project}</span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-2 flex justify-between">
              <Badge variant="secondary">Effectiveness: {prompt.effectiveness}</Badge>
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
