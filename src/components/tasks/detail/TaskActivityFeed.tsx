
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUsers } from "@/hooks/useUsers";

interface ActivityItem {
  id: string;
  type: 'status_change' | 'assignment' | 'priority_change' | 'creation' | 'comment';
  description: string;
  created_by: string;
  created_at: string;
}

interface TaskActivityFeedProps {
  taskId: number;
}

const TaskActivityFeed: React.FC<TaskActivityFeedProps> = ({ taskId }) => {
  // This will be replaced with actual data loading from API once backend is set up
  const mockActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'creation',
      description: 'Task created',
      created_by: 'auth0|user123',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
    },
    {
      id: '2',
      type: 'status_change',
      description: 'Status changed from "To Do" to "In Progress"',
      created_by: 'auth0|user456',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() // 12 hours ago
    }
  ];
  
  const { users, isLoading: isLoadingUsers } = useUsers();
  
  const getUserInfo = (userId: string) => {
    if (isLoadingUsers) return { name: "Loading...", initials: "..." };
    
    const user = users?.find(user => user.id === userId);
    const name = user?.full_name || user?.email || "Unknown User";
    
    // Generate initials from name
    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    
    return { name, initials };
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString();
  };
  
  if (mockActivities.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No activity recorded yet.
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {mockActivities.map((activity, index) => {
        const userInfo = getUserInfo(activity.created_by);
        
        return (
          <div key={activity.id}>
            <div className="flex gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{userInfo.initials}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="font-medium">{userInfo.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(activity.created_at)}
                  </div>
                </div>
                
                <p className="text-sm mt-1">{activity.description}</p>
              </div>
            </div>
            
            {index < mockActivities.length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskActivityFeed;
