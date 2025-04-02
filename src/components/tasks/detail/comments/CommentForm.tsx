
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { recordTaskActivity } from "@/utils/tasks/taskActivity";
import { toast } from "sonner";

interface CommentFormProps {
  taskId: number;
  currentUser: string | null;
  userInitials: string;
  onCommentAdded: (newComment: any) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  taskId, 
  currentUser, 
  userInitials,
  onCommentAdded 
}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (comment.trim()) {
      try {
        const newComment = await recordTaskActivity({
          task_id: taskId,
          type: 'comment',
          message: comment.trim()
        });
        
        if (newComment) {
          onCommentAdded(newComment);
          setComment("");
          toast.success("Comment added");
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        toast.error("Failed to add comment");
      }
    }
  };

  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback>{userInitials}</AvatarFallback>
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
  );
};

export default CommentForm;
