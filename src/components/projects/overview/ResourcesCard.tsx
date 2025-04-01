
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Github, Twitter, Instagram, Linkedin, Pencil, Plus } from "lucide-react";

interface ResourcesCardProps {
  domains?: string[];
  hasGithub?: boolean;
  socialAccounts: { name: string; icon: React.ElementType }[];
}

const ResourcesCard: React.FC<ResourcesCardProps> = ({ domains, hasGithub, socialAccounts }) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {domains && domains.length > 0 && (
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
          
          {hasGithub && (
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
  );
};

export default ResourcesCard;
