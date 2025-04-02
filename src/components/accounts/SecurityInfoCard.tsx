
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const SecurityInfoCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <strong>Secure Storage:</strong> All login credentials are encrypted at rest using AES-256 encryption.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <strong>Access Control:</strong> Only authorized team members can view full account details.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <strong>Audit Trail:</strong> All credential access is logged for security purposes.
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" asChild>
          <Link to="/settings/security">Security Settings</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SecurityInfoCard;
