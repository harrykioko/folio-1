
import React from "react";
import { Card } from "@/components/ui/card";

interface TaskDetailProps {
  task: {
    description?: string;
    assignee?: string;
    project?: string;
    dueDate?: string;
    created?: string;
  };
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Description</h3>
          <div className="prose dark:prose-invert">
            <p>{task.description || "No description provided."}</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Activity</h3>
          <div className="text-center text-muted-foreground py-8">
            No activity recorded yet.
          </div>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Details</h3>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Assignee</dt>
              <dd className="mt-1">{task.assignee || "Unassigned"}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Project</dt>
              <dd className="mt-1">{task.project}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Due Date</dt>
              <dd className="mt-1">{task.dueDate}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Created</dt>
              <dd className="mt-1">{task.created || "Unknown"}</dd>
            </div>
          </dl>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Related</h3>
          <div className="text-center text-muted-foreground py-8">
            No related items found.
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TaskDetail;
