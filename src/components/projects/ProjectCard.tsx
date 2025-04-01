
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import { Project } from "@/utils/supabaseProjects";

interface ProjectCardProps {
  project: Project;
  getStatusInfo: (status: Project['status']) => {
    label: string;
    icon: React.ReactNode;
    variant: 'default' | 'secondary' | 'outline';
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, getStatusInfo }) => {
  const statusInfo = getStatusInfo(project.status);
  
  // Calculate date display format
  const createdAt = new Date(project.created_at).toLocaleDateString();
  const updatedAt = new Date(project.updated_at).toLocaleDateString();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{project.name}</CardTitle>
          <Badge variant={statusInfo.variant}>
            {statusInfo.icon}
            {statusInfo.label}
          </Badge>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="space-y-4">
          <div className="flex justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              Created: {createdAt}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              Updated: {updatedAt}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <div className="flex -space-x-2">
          <Avatar className="h-7 w-7 border-2 border-background">
            <AvatarFallback className="text-xs">U</AvatarFallback>
          </Avatar>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/projects/${project.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
