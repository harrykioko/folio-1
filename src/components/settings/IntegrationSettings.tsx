
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Github, Mail, Calendar, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  connected?: boolean;
  onConnect: () => void;
  onDisconnect?: () => void;
  configFields?: React.ReactNode;
}

const IntegrationCard = ({
  title,
  description,
  icon,
  connected = false,
  onConnect,
  onDisconnect,
  configFields,
}: IntegrationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            {icon}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {connected ? (
              <>
                <span className="text-sm text-muted-foreground">Connected</span>
                <Switch checked={true} onCheckedChange={(checked) => !checked && onDisconnect?.()} />
              </>
            ) : (
              <Button variant="outline" onClick={onConnect}>
                Connect
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      {connected && configFields && (
        <CardContent>
          <div className="space-y-4">
            {configFields}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const IntegrationSettings = () => {
  const handleConnect = (service: string) => {
    console.log(`Connecting to ${service}`);
    // In a real app, this would trigger OAuth flow or API key input
  };

  const handleDisconnect = (service: string) => {
    console.log(`Disconnecting from ${service}`);
    // In a real app, this would revoke tokens and update state
  };

  return (
    <div className="space-y-6">
      <IntegrationCard
        title="GitHub"
        description="Connect your GitHub account to manage repositories and track issues."
        icon={<Github className="h-5 w-5" />}
        connected={true}
        onConnect={() => handleConnect("github")}
        onDisconnect={() => handleDisconnect("github")}
        configFields={
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Default Repository</label>
                <Input placeholder="username/repository" defaultValue="acme/project" />
              </div>
              <div>
                <label className="text-sm font-medium">Auto Sync</label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="github-sync" />
                  <label htmlFor="github-sync" className="text-sm">Enable automatic syncing</label>
                </div>
              </div>
            </div>
          </>
        }
      />

      <IntegrationCard
        title="Email Provider"
        description="Connect your email service for notifications and communication."
        icon={<Mail className="h-5 w-5" />}
        connected={false}
        onConnect={() => handleConnect("email")}
      />

      <IntegrationCard
        title="Calendar"
        description="Sync project deadlines and meetings with your calendar."
        icon={<Calendar className="h-5 w-5" />}
        connected={true}
        onConnect={() => handleConnect("calendar")}
        onDisconnect={() => handleDisconnect("calendar")}
        configFields={
          <>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Default Calendar</label>
                <Input placeholder="Calendar name" defaultValue="Work" />
              </div>
              <div>
                <label className="text-sm font-medium">Sync Options</label>
                <div className="flex flex-col space-y-2 pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="calendar-tasks" defaultChecked />
                    <label htmlFor="calendar-tasks" className="text-sm">Sync task deadlines</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="calendar-meetings" defaultChecked />
                    <label htmlFor="calendar-meetings" className="text-sm">Sync team meetings</label>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Add New Integration</CardTitle>
          <CardDescription>
            Connect additional services to enhance your workflow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Integration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
