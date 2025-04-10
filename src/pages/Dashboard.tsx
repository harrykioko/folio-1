import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FolderClosed, Lightbulb, Plus, Sparkles, UserCircle, Users, CheckSquare, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { useAccounts } from "@/hooks/useAccounts";

const Dashboard: React.FC = () => {
  const { projects, isLoading: projectsLoading } = useProjects();
  const { tasks, isLoading: tasksLoading } = useTasks();
  const { accounts, isLoading: accountsLoading } = useAccounts();
  
  const projectCount = projects?.length || 0;
  const taskCount = tasks?.length || 0;
  const accountCount = accounts?.length || 0;
  const promptCount = 132;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FolderClosed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsLoading ? "..." : projectCount}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/projects">View All Projects</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasksLoading ? "..." : taskCount}</div>
            <p className="text-xs text-muted-foreground">
              8 due this week
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/tasks">View All Tasks</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accounts</CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountsLoading ? "..." : accountCount}</div>
            <p className="text-xs text-muted-foreground">
              +1 this month
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/accounts">View All Accounts</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prompts</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promptCount}</div>
            <p className="text-xs text-muted-foreground">
              +26 this month
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/prompts">View All Prompts</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="prompts">Recent Prompts</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Tasks</h2>
            <Button size="sm" asChild>
              <Link to="/tasks/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Link>
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {[
                  { id: 1, title: "Update project documentation", project: "Project Alpha", due: "Tomorrow", priority: "High" },
                  { id: 2, title: "Review prompt library structure", project: "AI Tools", due: "Today", priority: "Urgent" },
                  { id: 3, title: "Implement API integration", project: "Dashboard X", due: "Next week", priority: "Medium" },
                  { id: 4, title: "Design new user onboarding flow", project: "LMS Portal", due: "In 2 days", priority: "High" },
                  { id: 5, title: "Update GitHub repository access", project: "Project Alpha", due: "Today", priority: "Medium" },
                ].map((task) => (
                  <li key={task.id} className="flex items-center p-3 rounded-md hover:bg-secondary/50">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{task.title}</span>
                        <Badge variant={task.priority === "Urgent" ? "destructive" : task.priority === "High" ? "default" : "secondary"} className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>{task.project}</span>
                        <span>•</span>
                        <span>Due {task.due}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <Button variant="outline" asChild>
                <Link to="/tasks">View All Tasks</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="prompts" className="space-y-4">
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
        </TabsContent>
      </Tabs>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { id: 1, user: "John Doe", action: "added a new project", object: "LMS Portal", time: "2 hours ago" },
                { id: 2, user: "Alex Smith", action: "completed task", object: "Design user flow", time: "5 hours ago" },
                { id: 3, user: "Emily Chen", action: "added a new prompt", object: "SEO Content Generator", time: "Yesterday" },
                { id: 4, user: "Tom Wilson", action: "updated GitHub repository", object: "Project Alpha", time: "Yesterday" }
              ].map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{activity.user.split(' ').map(name => name[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.object}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
