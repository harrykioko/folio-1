
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import { fetchTaskActivities, TaskActivity } from "@/utils/tasks/taskActivity";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TaskActivityFeedProps {
  taskId: number;
}

const TaskActivityFeed: React.FC<TaskActivityFeedProps> = ({ taskId }) => {
  const [activities, setActivities] = useState<TaskActivity[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { users, isLoading: isLoadingUsers } = useUsers();
  
  useEffect(() => {
    const loadActivities = async () => {
      try {
        setIsLoading(true);
        const allActivities = await fetchTaskActivities(taskId);
        
        // Filter out comment activities
        const nonCommentActivities = allActivities.filter(
          activity => activity.type !== 'comment'
        );
        
        setActivities(nonCommentActivities);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load activities'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadActivities();
  }, [taskId]);
  
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
  
  const getActivityIcon = (type: string) => {
    // This could be expanded to return different icons based on activity type
    return null;
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p className="text-destructive mb-2">Failed to load activity</p>
      </div>
    );
  }
  
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No activity recorded yet.
      </div>
    );
  }
  
  return (
    <div className="h-[250px]">
      <ScrollArea className="h-full w-full rounded-md">
        <div className="space-y-4 pr-4 pb-2">
          {activities.map((activity, index) => {
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
                    
                    <p className="text-sm mt-1">{activity.message}</p>
                  </div>
                </div>
                
                {index < activities.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TaskActivityFeed;
