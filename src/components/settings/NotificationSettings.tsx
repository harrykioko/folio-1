
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const NotificationSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Configure how and when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Email Notifications</h3>
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-tasks">Task assignments</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails when you're assigned to a task
                </p>
              </div>
              <Switch id="email-tasks" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-projects">Project additions</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails when you're added to a project
                </p>
              </div>
              <Switch id="email-projects" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-comments">Comment notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails when someone comments on your tasks
                </p>
              </div>
              <Switch id="email-comments" defaultChecked />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">In-App Notifications</h3>
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="app-tasks">Task updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for task status changes
                </p>
              </div>
              <Switch id="app-tasks" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="app-mentions">@Mentions</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when someone mentions you
                </p>
              </div>
              <Switch id="app-mentions" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="app-system">System notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about system updates
                </p>
              </div>
              <Switch id="app-system" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
