
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SidebarOptions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sidebar Options</CardTitle>
        <CardDescription>
          Customize your sidebar experience.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-collapse">Auto-collapse on small screens</Label>
            <Switch id="auto-collapse" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-labels">Always show labels</Label>
            <Switch id="show-labels" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="compact-mode">Compact mode</Label>
            <Switch id="compact-mode" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SidebarOptions;
