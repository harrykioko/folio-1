
import React, { useState } from "react";
import { Project } from "@/utils/supabaseProjects";
import { Card } from "@/components/ui/card";
import { 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Sparkles,
  FileText,
  Clock,
  Paperclip,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ProjectSidebarProps {
  project: Project;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ project }) => {
  const [openPromptAssistant, setOpenPromptAssistant] = useState(true);
  const [openActivity, setOpenActivity] = useState(true);
  const [openResources, setOpenResources] = useState(true);
  const [openAccounts, setOpenAccounts] = useState(true);
  const [openAttachments, setOpenAttachments] = useState(true);
  
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
      {/* Prompt Assistant */}
      <Collapsible open={openPromptAssistant} onOpenChange={setOpenPromptAssistant} className="space-y-2">
        <Card className="backdrop-blur-md bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
          <div className="p-4 flex items-center justify-between">
            <h3 className="text-base font-medium flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              Prompt Assistant
            </h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                {openPromptAssistant ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-3">
              <Textarea 
                placeholder="Ask the AI to generate content for your project..." 
                className="resize-none bg-background/50"
                rows={3}
              />
              <Button className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate
              </Button>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Recent Activity */}
      <Collapsible open={openActivity} onOpenChange={setOpenActivity} className="space-y-2">
        <Card className="backdrop-blur-md bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
          <div className="p-4 flex items-center justify-between">
            <h3 className="text-base font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              Recent Activity
            </h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                {openActivity ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="px-4 pb-4">
              <div className="space-y-3 max-h-[180px] overflow-y-auto scrollbar-thin">
                <div className="flex gap-3">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                    JD
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">John</span> updated task status
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-7 w-7 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-xs">
                    SM
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Sarah</span> added a new domain
                    </p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-7 w-7 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 text-xs">
                    MK
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Mike</span> created a prompt
                    </p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Pinned Resources */}
      <Collapsible open={openResources} onOpenChange={setOpenResources} className="space-y-2">
        <Card className="backdrop-blur-md bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
          <div className="p-4 flex items-center justify-between">
            <h3 className="text-base font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-primary" />
              Pinned Resources
            </h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                {openResources ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="px-4 pb-4">
              <div className="space-y-2">
                <div className="p-2 bg-background/50 rounded-lg text-sm hover:bg-background/80 transition cursor-pointer flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  Project Brief.pdf
                </div>
                <div className="p-2 bg-background/50 rounded-lg text-sm hover:bg-background/80 transition cursor-pointer flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  Brand Guidelines.pdf
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Plus className="h-3 w-3 mr-2" />
                  Add Resource
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Linked Accounts */}
      <Collapsible open={openAccounts} onOpenChange={setOpenAccounts} className="space-y-2">
        <Card className="backdrop-blur-md bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
          <div className="p-4 flex items-center justify-between">
            <h3 className="text-base font-medium flex items-center">
              <Globe className="h-4 w-4 mr-2 text-primary" />
              Linked Accounts
            </h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                {openAccounts ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-3">
              {/* GitHub */}
              {project.hasGithub ? (
                <div className="p-2 bg-background/50 rounded-lg flex items-center justify-between group hover:bg-background/80 transition">
                  <div className="flex items-center">
                    <Github className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">github.com/project-repo</span>
                  </div>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="w-full flex items-center">
                  <Github className="h-3 w-3 mr-2" />
                  Link GitHub
                </Button>
              )}
              
              {/* Domains */}
              {domains.length > 0 ? (
                domains.map((domain, idx) => (
                  <div 
                    key={idx}
                    className="p-2 bg-background/50 rounded-lg flex items-center justify-between group hover:bg-background/80 transition"
                  >
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{domain}</span>
                    </div>
                  </div>
                ))
              ) : (
                <Button variant="outline" size="sm" className="w-full flex items-center">
                  <Globe className="h-3 w-3 mr-2" />
                  Add Domain
                </Button>
              )}
              
              {/* Social Accounts */}
              {socialAccounts.length > 0 ? (
                socialAccounts.map((account, idx) => {
                  const Icon = account.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-2 bg-background/50 rounded-lg flex items-center justify-between group hover:bg-background/80 transition"
                    >
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{account.name}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <Button variant="outline" size="sm" className="w-full flex items-center">
                  <Twitter className="h-3 w-3 mr-2" />
                  Add Social Account
                </Button>
              )}
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Attachments */}
      <Collapsible open={openAttachments} onOpenChange={setOpenAttachments} className="space-y-2">
        <Card className="backdrop-blur-md bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
          <div className="p-4 flex items-center justify-between">
            <h3 className="text-base font-medium flex items-center">
              <Paperclip className="h-4 w-4 mr-2 text-primary" />
              Attachments
            </h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                {openAttachments ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="px-4 pb-4">
              <div className="text-center py-4 text-muted-foreground">
                <p className="text-sm mb-2">No attachments yet</p>
                <Button variant="outline" size="sm">
                  <Plus className="h-3 w-3 mr-2" />
                  Add Attachment
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default ProjectSidebar;
