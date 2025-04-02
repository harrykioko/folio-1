
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/utils/supabaseProjects";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Plus, 
  Pencil,
  Sparkles
} from "lucide-react";

interface ProjectRightPanelProps {
  project: Project;
}

const ProjectRightPanel: React.FC<ProjectRightPanelProps> = ({ project }) => {
  const [openDomains, setOpenDomains] = useState(true);
  const [openGithub, setOpenGithub] = useState(true);
  const [openSocial, setOpenSocial] = useState(true);
  const [openPromptAssistant, setOpenPromptAssistant] = useState(true);
  
  // Safely get domains array
  const domains = project.domains || [];
  
  // Create social media array
  const socialAccounts = [];
  const socialArray = Array.isArray(project.social) ? project.social : [];
  
  if (socialArray.includes("twitter")) socialAccounts.push({ name: "Twitter", icon: Twitter });
  if (socialArray.includes("instagram")) socialAccounts.push({ name: "Instagram", icon: Instagram });
  if (socialArray.includes("linkedin")) socialAccounts.push({ name: "LinkedIn", icon: Linkedin });

  return (
    <div className="space-y-6">
      {/* Team Card */}
      <Card className="rounded-2xl shadow-md overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex -space-x-2 mb-2">
            {Array(project.team || 3).fill(0).map((_, i) => (
              <Avatar key={i} className="border-2 border-background">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {String.fromCharCode(65 + i)}
                </AvatarFallback>
              </Avatar>
            ))}
            <Avatar className="border-2 border-background">
              <AvatarFallback className="bg-muted">
                <Plus className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>

      {/* Resources Section - Domains */}
      <Collapsible open={openDomains} onOpenChange={setOpenDomains} className="space-y-2">
        <Card className="rounded-2xl shadow-md overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Domains</CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                  {openDomains ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-2">
              {domains.length > 0 ? (
                domains.map((domain, idx) => (
                  <div 
                    key={idx} 
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{domain}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-2 text-muted-foreground">
                  <p className="text-sm">No domains added yet.</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Domain
              </Button>
            </CardFooter>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* GitHub Repository */}
      <Collapsible open={openGithub} onOpenChange={setOpenGithub} className="space-y-2">
        <Card className="rounded-2xl shadow-md overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">GitHub</CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                  {openGithub ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          
          <CollapsibleContent>
            <CardContent className="pt-0">
              {project.hasGithub ? (
                <div 
                  className="group flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center">
                    <Github className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>github.com/project-repo</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center py-2 text-muted-foreground">
                  <p className="text-sm">No GitHub repository linked.</p>
                </div>
              )}
            </CardContent>
            
            {!project.hasGithub && (
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Link Repository
                </Button>
              </CardFooter>
            )}
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Social Accounts */}
      <Collapsible open={openSocial} onOpenChange={setOpenSocial} className="space-y-2">
        <Card className="rounded-2xl shadow-md overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Social Accounts</CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                  {openSocial ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-2">
              {socialAccounts.length > 0 ? (
                socialAccounts.map((account, idx) => (
                  <div 
                    key={idx} 
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center">
                      <account.icon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{account.name}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-2 text-muted-foreground">
                  <p className="text-sm">No social accounts added yet.</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Social Account
              </Button>
            </CardFooter>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Prompt Assistant */}
      <Collapsible open={openPromptAssistant} onOpenChange={setOpenPromptAssistant} className="space-y-2">
        <Card className="rounded-2xl shadow-md overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Prompt Assistant</CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                  {openPromptAssistant ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-3">
              <Textarea 
                placeholder="Ask the AI to generate content for your project..." 
                className="resize-none"
                rows={3}
              />
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate
              </Button>
            </CardFooter>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default ProjectRightPanel;
