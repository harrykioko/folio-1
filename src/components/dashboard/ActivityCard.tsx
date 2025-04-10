
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ActivityCard: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <Button variant="ghost" size="sm">View all</Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {[
              { id: 1, user: "John Doe", action: "added a new project", object: "LMS Portal", time: "2 hours ago" },
              { id: 2, user: "Alex Smith", action: "completed task", object: "Design user flow", time: "5 hours ago" },
              { id: 3, user: "Emily Chen", action: "added a new prompt", object: "SEO Content Generator", time: "Yesterday" },
              { id: 4, user: "Tom Wilson", action: "updated GitHub repository", object: "Project Alpha", time: "Yesterday" }
            ].map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{activity.user.split(' ').map(name => name[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.object}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityCard;
