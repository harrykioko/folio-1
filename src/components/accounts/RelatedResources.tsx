
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bookmark, Globe } from "lucide-react";
import { Account } from "@/utils/accountTypes";

interface RelatedResourcesProps {
  accountId?: string;
  account?: Account | null;
}

const RelatedResources: React.FC<RelatedResourcesProps> = ({ accountId, account }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Resources</CardTitle>
      </CardHeader>
      <CardContent>
        {accountId && account?.projectId ? (
          <div className="space-y-2">
            <Link to={`/projects/${account.projectId}`} className="block">
              <Button variant="outline" className="w-full justify-start">
                <Bookmark className="mr-2 h-4 w-4" />
                View Project: {account.projectName}
              </Button>
            </Link>
            <a href={account.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full justify-start">
                <Globe className="mr-2 h-4 w-4" />
                Visit {account.name}
              </Button>
            </a>
          </div>
        ) : (
          <p className="text-muted-foreground">
            {accountId ? 
              "No related resources found." : 
              "Related resources will be available after the account is created."
            }
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RelatedResources;
