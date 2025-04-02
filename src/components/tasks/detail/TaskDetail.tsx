
import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task } from "@/utils/tasks/types";
import { useUsers } from "@/hooks/useUsers";
import { Skeleton } from "@/components/ui/skeleton";
import TaskDetailSidebar from "./TaskDetailSidebar";
import TaskDescription from "./TaskDescription";
import TaskActivityFeed from "./TaskActivityFeed";
import TaskChecklist from "./TaskChecklist";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
  const { users, isLoading: isLoadingUsers } = useUsers();
  
  const getAssigneeName = () => {
    if (!task.assigned_to) return "Unassigned";
    if (isLoadingUsers) return <Skeleton className="h-5 w-32" />;
    
    const user = users?.find(user => user.id === task.assigned_to);
    return user?.full_name || user?.email || "Unknown User";
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="xl:col-span-3 space-y-6">
        <Card className="p-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6">
              <TaskDescription task={task} />
            </TabsContent>
            
            <TabsContent value="checklist">
              <TaskChecklist taskId={task.id} />
            </TabsContent>
            
            <TabsContent value="activity">
              <TaskActivityFeed taskId={task.id} />
            </TabsContent>
          </Tabs>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Attachments</h3>
          <div className="text-center text-muted-foreground py-8">
            <p>No attachments yet</p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Attachment
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Related Items</h3>
          <div className="text-center text-muted-foreground py-8">
            <p>No related items yet</p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Link Task
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="xl:col-span-1 space-y-6">
        <TaskDetailSidebar 
          task={task}
          formattedTask={formattedTask}
        />
      </div>
    </div>
  );
};

export default TaskDetail;
