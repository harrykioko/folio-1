
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useAuthSession } from "@/hooks/useAuthSession";
import { useUsers } from "@/hooks/useUsers";

interface TaskCommentsProps {
  taskId: number;
}

const TaskComments: React.FC<TaskCommentsProps> = ({ taskId }) => {
  const [comment, setComment] = useState("");
  const { session } = useAuthSession();
  const { users } = useUsers();
  
  // For demonstration purposes only - will be replaced with actual data in future
  const mockComments = [
    {
      id: 1,
      user_id: session?.user?.id || "",
      message: "Looks good so far!",
      created_at: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
    },
    {
      id: 2,
      user_id: session?.user?.id || "",
      message: "I'll handle attachments next",
      created_at: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
    }
  ];
  
  const handleSubmit = () => {
    if (comment.trim()) {
      // This is a placeholder for future implementation
      // We'll implement the actual backend in a follow-up task
      console.log("Comment submitted:", comment);
      setComment("");
    }
  };
  
  const getUserInfo = (userId: string) => {
    const user = users?.find(u => u.id === userId);
    const name = user?.full_name || user?.email || "Unknown User";
    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    
    return { name, initials };
  };
  
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            {getUserInfo(session?.user?.id || "").initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>
        <Button 
          size="sm" 
          onClick={handleSubmit}
          disabled={!comment.trim()}
        >
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
      
      {mockComments.length > 0 ? (
        <div className="space-y-4 pt-4">
          {mockComments.map((comment) => {
            const userInfo = getUserInfo(comment.user_id);
            
            return (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{userInfo.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{userInfo.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-sm">{comment.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-4">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
};

export default TaskComments;
