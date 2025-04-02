
import React from "react";
import { Card } from "@/components/ui/card";
import { useUsers } from "@/hooks/useUsers";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/utils/tasks/types";
import TaskDescription from "./TaskDescription";
import TaskChecklist from "./TaskChecklist";
import TaskActivityFeed from "./TaskActivityFeed";
import TaskDetailSidebar from "./TaskDetailSidebar";
import TaskComments from "./TaskComments";

interface TaskDetailProps {
  task: Task;
  formattedTask: {
    title: string;
    status: string;
    priority: string;
    project: string;
    projectId?: number | null;
    assignee?: string | null;
    dueDate?: string;
    created?: string;
  };
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, formattedTask }) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <Card className="p-6">
          <TaskDescription task={task} />
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Checklist</h3>
          <TaskChecklist taskId={task.id} />
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Comments</h3>
          <TaskComments taskId={task.id} />
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Activity</h3>
          <TaskActivityFeed taskId={task.id} />
        </Card>
      </div>
      
      <div className="space-y-6">
        <TaskDetailSidebar 
          task={task}
          formattedTask={formattedTask}
        />
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Attachments</h3>
          <div className="text-center text-muted-foreground py-8">
            <p className="mb-4">No attachments yet</p>
            <button className="text-primary hover:underline">
              + Add Attachment
            </button>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Related Items</h3>
          <div className="text-center text-muted-foreground py-8">
            <p className="mb-4">No related items yet</p>
            <button className="text-primary hover:underline">
              + Link Task
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TaskDetail;
