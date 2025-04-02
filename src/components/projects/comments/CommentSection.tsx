
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

const CommentSection: React.FC = () => {
  return (
    <Card className="backdrop-blur-md bg-white/5 p-6 border border-white/10 shadow-lg rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Comments
        </h2>
        <span className="text-xs text-muted-foreground">3 comments</span>
      </div>
      
      <div className="mb-4">
        <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              JD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">2 days ago</span>
              </div>
              <p className="text-sm mt-1">The milestones look good, but I think we should add a beta testing phase before the MVP launch.</p>
            </div>
          </div>
        </div>
        
        <div className="border-l-2 border-gray-200 pl-4 py-2">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-medium">
              SM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Sarah Miller</span>
                <span className="text-xs text-muted-foreground">Yesterday</span>
              </div>
              <p className="text-sm mt-1">Great progress on the social media accounts. We're seeing good traction already!</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <Textarea 
          placeholder="Leave a comment... Use @ to tag teammates" 
          className="min-h-[80px] bg-background/50"
        />
        <div className="flex justify-end mt-2">
          <Button size="sm">Post Comment</Button>
        </div>
      </div>
    </Card>
  );
};

export default CommentSection;
