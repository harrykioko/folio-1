
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectsTabContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Projects</h2>
        <Button size="sm" asChild>
          <Link to="/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { id: 1, name: "Project Alpha", description: "AI-powered content generation platform", progress: 75, team: 4 },
          { id: 2, name: "Dashboard X", description: "Analytics dashboard for marketing teams", progress: 45, team: 3 },
          { id: 3, name: "LMS Portal", description: "Learning management system", progress: 90, team: 5 },
        ].map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge className="bg-secondary text-secondary-foreground">{project.progress}%</Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="text-muted-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="flex -space-x-2">
                {Array(project.team).fill(0).map((_, i) => (
                  <Avatar key={i} className="h-7 w-7 border-2 border-background">
                    <AvatarFallback className="text-xs">{String.fromCharCode(65 + i)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/projects/${project.id}`}>View</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTabContent;
