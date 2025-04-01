
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DangerZoneSection = () => {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>
          Be careful with these actions, they cannot be reversed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Delete Account</p>
            <p className="text-sm text-muted-foreground">
              This will permanently delete your account and all associated data.
            </p>
          </div>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DangerZoneSection;
