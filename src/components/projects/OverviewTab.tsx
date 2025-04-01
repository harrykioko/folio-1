
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Check, Clock, Github, Globe, Instagram, Linkedin, Pencil, Plus, Twitter } from "lucide-react";

interface OverviewTabProps {
  project: {
    progress: number;
    startDate: string;
    dueDate: string;
    team: number;
    domains: string[];
    hasGithub: boolean;
    social: string[];
  };
}

const OverviewTab: React.FC<OverviewTabProps> = ({ project }) => {
  // Calculate social accounts for display
  const socialAccounts = [];
  if (project.social.includes("twitter")) socialAccounts.push({ name: "Twitter", icon: Twitter });
  if (project.social.includes("instagram")) socialAccounts.push({ name: "Instagram", icon: Instagram });
  if (project.social.includes("linkedin")) socialAccounts.push({ name: "LinkedIn", icon: Linkedin });

  return (
    <div className="space-y-4">
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
              {project.domains.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Globe className="mr-2 h-4 w-4" /> Domains
                  </h4>
                  <div className="space-y-2">
                    {project.domains.map((domain, idx) => (
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
    </div>
  );
};

export default OverviewTab;
