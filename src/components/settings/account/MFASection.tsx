
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MFASection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Multi-factor Authentication</CardTitle>
        <CardDescription>
          Add an extra layer of security to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Authenticator app</p>
            <p className="text-sm text-muted-foreground">
              Use an authenticator app to get two-factor authentication codes when prompted.
            </p>
          </div>
          <Button variant="outline">Set up</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MFASection;
