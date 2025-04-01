
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert"; // Add missing imports
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
  Clock,
  AlertCircle
} from "lucide-react";
import { fetchProjects, Project } from "@/utils/supabaseProjects";

const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error("Error loading projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, []);
  
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Helper function to get status display info
  const getStatusInfo = (status: Project["status"]) => {
    switch(status) {
      case 'active':
        return { 
          label: 'Active',
          icon: <CheckCircle2 className="mr-1 h-3 w-3" />,
          variant: 'default' as const
        };
      case 'development':
        return { 
          label: 'In Development',
          icon: <Clock className="mr-1 h-3 w-3" />,
          variant: 'default' as const
        };
      case 'ideation':
        return { 
          label: 'Ideation',
          icon: <AlertCircle className="mr-1 h-3 w-3" />,
          variant: 'secondary' as const
        };
      case 'archive':
        return { 
          label: 'Archived',
          icon: <AlertCircle className="mr-1 h-3 w-3" />,
          variant: 'outline' as const
        };
      default:
        return { 
          label: 'Unknown',
          icon: <AlertCircle className="mr-1 h-3 w-3" />,
          variant: 'outline' as const
        };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <Button asChild>
            <Link to="/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

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
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="archive">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} getStatusInfo={getStatusInfo} />
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
                <ProjectCard key={project.id} project={project} getStatusInfo={getStatusInfo} />
              ))}
          </div>
          {filteredProjects.filter(p => p.status === 'active').length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No active projects found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="development" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects
              .filter((project) => project.status === 'development')
              .map((project) => (
                <ProjectCard key={project.id} project={project} getStatusInfo={getStatusInfo} />
              ))}
          </div>
          {filteredProjects.filter(p => p.status === 'development').length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No development projects found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="archive" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects
              .filter((project) => project.status === 'archive')
              .map((project) => (
                <ProjectCard key={project.id} project={project} getStatusInfo={getStatusInfo} />
              ))}
          </div>
          {filteredProjects.filter(p => p.status === 'archive').length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No archived projects found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

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
  
  // Calculate date display format (simplified for now)
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

export default Projects;
