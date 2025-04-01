import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Github, 
  Globe, 
  AlertCircle, 
  Check, 
  CheckCircle2, 
  Instagram, 
  Linkedin, 
  MoreHorizontal, 
  Pencil, 
  Plus, 
  Trash2, 
  Twitter 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormValues } from "@/components/projects/ProjectForm";

// Import mock data from the Projects component
import { projects } from "@/utils/projectUtils";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the project in our dummy data
  const project = projects.find(p => p.id.toString() === projectId);
  
  // Check if this is a new project or if the project was not found
  useEffect(() => {
    // Only redirect if projectId is NOT "new" AND project is not found
    if (!project && projectId !== "new") {
      navigate("/projects");
      toast.error("Project not found");
    }
  }, [project, projectId, navigate]);

  // Handle the case when we're creating a new project
  if (projectId === "new") {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/projects")} className="mb-4">
            Back to Projects
          </Button>
          <h1 className="text-3xl font-bold">Create New Project</h1>
        </div>
        <ProjectForm 
          onSubmit={(data) => {
            console.log("New project data:", data);
            // In a real app, we would save this to the database
            toast.success("Project created successfully!");
            navigate("/projects");
          }} 
        />
      </div>
    );
  }

  // If project is not found and we're not creating a new one, return null
  // The useEffect above will handle redirecting
  if (!project) {
    return null;
  }

  const handleEditSubmit = (data: ProjectFormValues) => {
    console.log("Updated project data:", data);
    // In a real app, we would update this in the database
    toast.success("Project updated successfully!");
    setIsEditDialogOpen(false);
  };

  const handleDeleteProject = () => {
    // In a real app, we would delete from the database
    toast.success("Project deleted successfully!");
    navigate("/projects");
  };

  // Calculate domains and social accounts for display
  const domains = project.domains || [];
  const socialAccounts = [];
  if (project.social.includes("twitter")) socialAccounts.push({ name: "Twitter", icon: Twitter });
  if (project.social.includes("instagram")) socialAccounts.push({ name: "Instagram", icon: Instagram });
  if (project.social.includes("linkedin")) socialAccounts.push({ name: "LinkedIn", icon: Linkedin });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/projects")} size="sm">
              Back
            </Button>
            <Badge variant={project.status === 'completed' ? 'secondary' : 'default'}>
              {project.status === 'completed' ? (
                <CheckCircle2 className="mr-1 h-3 w-3" />
              ) : (
                <Clock className="mr-1 h-3 w-3" />
              )}
              {project.status === 'completed' ? 'Completed' : 'In Progress'}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold mt-2">{project.name}</h1>
          <p className="text-muted-foreground mt-1">{project.description}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Project
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive"
                    onSelect={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <ProjectForm 
                  isEditing={true}
                  defaultValues={{
                    name: project.name,
                    description: project.description,
                    startDate: project.startDate,
                    dueDate: project.dueDate,
                    githubRepo: project.hasGithub ? "https://github.com/example/repo" : "",
                    domains: project.domains?.join("\n") || "",
                    twitter: project.social.includes("twitter") ? "@projecthandle" : "",
                    instagram: project.social.includes("instagram") ? "@projecthandle" : "",
                    linkedin: project.social.includes("linkedin") ? "linkedin.com/company/project" : "",
                  }}
                  onSubmit={handleEditSubmit}
                />
              </DialogContent>
            </Dialog>
            
            <DialogContent>
              <CardTitle className="text-xl mb-2">Delete Project</CardTitle>
              <CardDescription className="mb-4">
                Are you sure you want to delete this project? This action cannot be undone.
              </CardDescription>
              
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Deleting this project will remove all associated data, including tasks, credentials, and settings.
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteProject}>
                  Delete Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Project Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Completion</span>
                    <span className="text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Start Date:</span>
                    </div>
                    <span className="font-medium">{project.startDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Due Date:</span>
                    </div>
                    <span className="font-medium">{project.dueDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  {Array(project.team).fill(0).map((_, i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                    </Avatar>
                  ))}
                  <Button variant="outline" className="rounded-full h-10 w-10 ml-1" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {domains.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Globe className="mr-2 h-4 w-4" /> Domains
                      </h4>
                      <div className="space-y-2">
                        {domains.map((domain, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-md">
                            <span>{domain}</span>
                            <Button variant="ghost" size="sm">
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus className="mr-2 h-3.5 w-3.5" />
                          Add Domain
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {project.hasGithub && (
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Github className="mr-2 h-4 w-4" /> GitHub Repository
                      </h4>
                      <div className="p-2 bg-muted rounded-md flex items-center justify-between">
                        <span className="text-sm">github.com/example/repo</span>
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {socialAccounts.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        Social Media Accounts
                      </h4>
                      <div className="space-y-2">
                        {socialAccounts.map((account, idx) => {
                          const Icon = account.icon;
                          return (
                            <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-md">
                              <div className="flex items-center">
                                <Icon className="mr-2 h-4 w-4" />
                                <span>{account.name}</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          );
                        })}
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus className="mr-2 h-3.5 w-3.5" />
                          Add Social Account
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tasks Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed</span>
                    <Badge variant="outline" className="flex gap-1 items-center">
                      <Check className="h-3 w-3" />
                      {Math.round(project.progress / 20)} / 5
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Progress</span>
                    <Badge variant="outline" className="flex gap-1 items-center">
                      <Clock className="h-3 w-3" />
                      {5 - Math.round(project.progress / 20)}
                    </Badge>
                  </div>
                  <Separator />
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tasks</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                <p>No tasks have been added to this project yet.</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Linked Accounts</CardTitle>
                <Button asChild>
                  <a href="/accounts/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Account
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                <p>No accounts have been linked to this project yet.</p>
                <Button variant="outline" className="mt-4" asChild>
                  <a href="/accounts/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Link Account
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompts">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Prompt Library</CardTitle>
                <Button asChild>
                  <a href="/prompts/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Prompt
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                <p>No prompts have been added to this project yet.</p>
                <Button variant="outline" className="mt-4" asChild>
                  <a href="/prompts/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Prompt
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                <p>No recent activity for this project.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetails;
