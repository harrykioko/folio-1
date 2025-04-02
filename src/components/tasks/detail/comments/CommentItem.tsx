
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";
import { TaskActivity } from "@/utils/tasks/taskActivity";

interface CommentItemProps {
  comment: TaskActivity;
  userName: string;
  userInitials: string;
  timeAgo: string;
  isOwner: boolean;
  onDelete: (commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  userName,
  userInitials,
  timeAgo,
  isOwner,
  onDelete
}) => {
  return (
    <div className="flex gap-3 group">
      <Avatar className="h-8 w-8">
        <AvatarFallback>{userInitials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">{userName}</span>
            <span className="text-xs text-muted-foreground">
              {timeAgo}
            </span>
          </div>
          {isOwner && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDelete(comment.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
        <p className="text-sm">{comment.message}</p>
      </div>
    </div>
  );
};

export default CommentItem;
