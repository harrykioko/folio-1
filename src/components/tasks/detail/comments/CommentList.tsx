
import React from "react";
import { TaskActivity } from "@/utils/tasks/taskActivity";
import { Skeleton } from "@/components/ui/skeleton";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: TaskActivity[];
  isLoading: boolean;
  currentUser: string | null;
  getUserInfo: (userId: string) => { name: string; initials: string };
  formatTimeAgo: (dateString: string) => string;
  onDeleteComment: (commentId: string) => Promise<void>;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  isLoading,
  currentUser,
  getUserInfo,
  formatTimeAgo,
  onDeleteComment
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 pt-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-4">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="space-y-4 pt-4">
      {comments.map((comment) => {
        const userInfo = getUserInfo(comment.created_by);
        const isOwner = currentUser === comment.created_by;
        
        return (
          <CommentItem
            key={comment.id}
            comment={comment}
            userName={userInfo.name}
            userInitials={userInfo.initials}
            timeAgo={formatTimeAgo(comment.created_at)}
            isOwner={isOwner}
            onDelete={onDeleteComment}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
