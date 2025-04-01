
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { fetchProjects, Project } from "@/utils/supabaseProjects";

// Import our new components
import SearchFilter from "@/components/projects/SearchFilter";
import ProjectList from "@/components/projects/ProjectList";
import ProjectsLoading from "@/components/projects/ProjectsLoading";
import ProjectsError from "@/components/projects/ProjectsError";

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

  if (loading) {
    return <ProjectsLoading />;
  }

  if (error) {
    return <ProjectsError error={error} />;
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

      <SearchFilter 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="archive">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ProjectList 
            projects={projects} 
            status="all"
            searchQuery={searchQuery} 
          />
        </TabsContent>

        <TabsContent value="active">
          <ProjectList 
            projects={projects} 
            status="active"
            searchQuery={searchQuery} 
          />
        </TabsContent>

        <TabsContent value="development">
          <ProjectList 
            projects={projects} 
            status="development"
            searchQuery={searchQuery} 
          />
        </TabsContent>

        <TabsContent value="archive">
          <ProjectList 
            projects={projects} 
            status="archive"
            searchQuery={searchQuery} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;
