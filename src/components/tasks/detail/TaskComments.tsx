
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUsers } from "@/hooks/useUsers";
import { TaskActivity } from "@/utils/tasks/taskActivity";
import { toast } from "sonner";
import { CommentForm, CommentList, formatTimeAgo } from "./comments";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TaskCommentsProps {
  taskId: number;
}

const TaskComments: React.FC<TaskCommentsProps> = ({ taskId }) => {
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
  
  // Handle adding a new comment
  const handleCommentAdded = (newComment: TaskActivity) => {
    setComments(prevComments => [newComment, ...prevComments]);
  };
  
  // Handle deleting a comment
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
  
  const userInfo = currentUser ? getUserInfo(currentUser) : { name: "User", initials: "U" };
  
  return (
    <div className="space-y-6">
      <CommentForm
        taskId={taskId}
        currentUser={currentUser}
        userInitials={userInfo.initials}
        onCommentAdded={handleCommentAdded}
      />
      
      <ScrollArea className="max-h-[320px] rounded-md">
        <CommentList
          comments={comments}
          isLoading={isLoading}
          currentUser={currentUser}
          getUserInfo={getUserInfo}
          formatTimeAgo={formatTimeAgo}
          onDeleteComment={handleDeleteComment}
        />
      </ScrollArea>
    </div>
  );
};

export default TaskComments;
