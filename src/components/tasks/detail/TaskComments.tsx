
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUsers } from "@/hooks/useUsers";
import { Skeleton } from "@/components/ui/skeleton";
import { recordTaskActivity, TaskActivity } from "@/utils/tasks/taskActivity";
import { toast } from "sonner";

interface TaskCommentsProps {
  taskId: number;
}

const TaskComments: React.FC<TaskCommentsProps> = ({ taskId }) => {
  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [comments, setComments] = useState<TaskActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { users, isLoading: isLoadingUsers } = useUsers();
  
  // Get current user ID for comments
  useEffect(() => {
    const getUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setCurrentUser(data.session.user.id);
      }
    };
    getUserSession();
  }, []);
  
  // Fetch comments from task_activity table
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('task_activity')
          .select('*')
          .eq('task_id', taskId)
          .eq('type', 'comment')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching comments:', error);
          throw error;
        }
        
        setComments(data as TaskActivity[]);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (taskId) {
      fetchComments();
    }
  }, [taskId]);
  
  const handleSubmit = async () => {
    if (comment.trim()) {
      try {
        const newComment = await recordTaskActivity({
          task_id: taskId,
          type: 'comment',
          message: comment.trim()
        });
        
        if (newComment) {
          // Add the new comment to the list
          setComments(prevComments => [newComment, ...prevComments]);
          setComment("");
          toast.success("Comment added");
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        toast.error("Failed to add comment");
      }
    }
  };
  
  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('task_activity')
        .delete()
        .eq('id', commentId)
        .eq('created_by', currentUser || ''); // Ensure only owner can delete
        
      if (error) throw error;
      
      // Remove the deleted comment from state
      setComments(prevComments => prevComments.filter(c => c.id !== commentId));
      toast.success("Comment deleted");
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error("Failed to delete comment");
    }
  };
  
  // Get user information from the users hook
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
            {currentUser ? getUserInfo(currentUser).initials : "U"}
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
          disabled={!comment.trim() || !currentUser}
        >
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
      
      {isLoading ? (
        <div className="space-y-4 pt-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4 pt-4">
          {comments.map((comment) => {
            const userInfo = getUserInfo(comment.created_by);
            const isOwner = currentUser === comment.created_by;
            
            return (
              <div key={comment.id} className="flex gap-3 group">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{userInfo.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{userInfo.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(comment.created_at)}
                      </span>
                    </div>
                    {isOwner && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
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
