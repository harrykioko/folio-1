
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityLogProps {
  accountId?: string;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ accountId }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accountId && (
            <>
              <div className="border-b pb-2">
                <p className="text-sm text-muted-foreground">Last updated</p>
                <p className="font-medium">2 days ago</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm text-muted-foreground">Created by</p>
                <p className="font-medium">John Doe</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm text-muted-foreground">Last accessed</p>
                <p className="font-medium">Today at 10:45 AM</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Access count</p>
                <p className="font-medium">12 times</p>
              </div>
            </>
          )}
          {!accountId && (
            <p className="text-muted-foreground">
              Activity log will be available after the account is created.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
