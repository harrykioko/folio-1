
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ActivityTabProps {
  projectId: number;
}

// Sample activity data for demonstration
const activityData = [
  {
    id: 1,
    user: "John D.",
    action: "created a new task",
    item: "Update project documentation",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    user: "Emily C.",
    action: "updated prompt",
    item: "SEO Content Generator",
    timestamp: "Yesterday"
  },
  {
    id: 3,
    user: "Alex S.",
    action: "linked account",
    item: "GitHub Repository",
    timestamp: "2 days ago"
  },
  {
    id: 4,
    user: "Sarah J.",
    action: "completed task",
    item: "Design new user onboarding flow",
    timestamp: "3 days ago"
  },
  {
    id: 5,
    user: "Tom W.",
    action: "updated project details",
    item: "Changed project description",
    timestamp: "4 days ago"
  }
];

const ActivityTab: React.FC<ActivityTabProps> = ({ projectId }) => {
  // In a real app, we would filter activity by project ID
  // For now, we'll just show the sample data
  const activities = activityData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p>No recent activity for this project.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-2 rounded-md hover:bg-muted/50">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-sm text-muted-foreground">{activity.item}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTab;
