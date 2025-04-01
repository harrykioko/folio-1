import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Globe, 
  Github, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Plus, 
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Clock
} from "lucide-react";
import { projects } from "@/utils/projectUtils";

const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Button asChild>
          <Link to="/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="shrink-0">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No projects found matching your search</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects
              .filter((project) => project.status === 'active')
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
          {filteredProjects.filter(p => p.status === 'active').length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No active projects found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects
              .filter((project) => project.status === 'completed')
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
          {filteredProjects.filter(p => p.status === 'completed').length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No completed projects found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{project.name}</CardTitle>
          <Badge variant={project.status === 'completed' ? 'secondary' : 'default'}>
            {project.status === 'completed' ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : (
              <Clock className="mr-1 h-3 w-3" />
            )}
            {project.status === 'completed' ? 'Completed' : 'In Progress'}
          </Badge>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="text-muted-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {project.domains.length > 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {project.domains.length} {project.domains.length === 1 ? 'domain' : 'domains'}
              </Badge>
            )}
            
            {project.hasGithub && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Github className="h-3 w-3" />
                Repository
              </Badge>
            )}
            
            {project.social.length > 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                {project.social.includes('twitter') && <Twitter className="h-3 w-3" />}
                {project.social.includes('instagram') && <Instagram className="h-3 w-3" />}
                {project.social.includes('linkedin') && <Linkedin className="h-3 w-3" />}
                {project.social.length} accounts
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {project.startDate} - {project.dueDate}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <div className="flex -space-x-2">
          {Array(project.team).fill(0).map((_, i) => (
            <Avatar key={i} className="h-7 w-7 border-2 border-background">
              <AvatarFallback className="text-xs">{String.fromCharCode(65 + i)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/projects/${project.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Projects;
