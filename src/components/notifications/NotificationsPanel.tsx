
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckSquare, FolderGit, Clock } from "lucide-react";
import { projects } from "@/utils/projectUtils";
import { tasks } from "@/utils/taskUtils";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface NotificationsPanelProps {
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onClose }) => {
  const { toast } = useToast();

  // Mock data for assigned tasks
  const assignedTasks = tasks.slice(0, 3).map(task => ({
    ...task,
    timeAgo: task.created
  }));

  // Mock data for project additions
  const addedProjects = [
    { id: projects[0].id, name: projects[0].name, timeAgo: "2 days ago", role: "Editor" },
    { id: projects[1].id, name: projects[1].name, timeAgo: "1 week ago", role: "Viewer" }
  ];

  const handleMarkAllAsRead = () => {
    toast({
      title: "Notifications cleared",
      description: "All notifications have been marked as read",
    });
    onClose();
  };

  return (
    <div className="w-[380px] max-w-[calc(100vw-24px)] rounded-lg border bg-card shadow-lg animate-fade-in">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <h4 className="font-medium">Notifications</h4>
          <Badge className="ml-1 bg-primary text-primary-foreground">2</Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
          Mark all as read
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="border-b px-4">
          <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Projects
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="h-[400px]">
          <TabsContent value="all" className="m-0">
            <div className="divide-y">
              <div className="p-2">
                <h5 className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  ASSIGNED TASKS
                </h5>
                {assignedTasks.map((task) => (
                  <Link
                    to={`/tasks/${task.id}`}
                    key={task.id}
                    onClick={onClose}
                    className="flex items-start gap-3 rounded-md p-2 hover:bg-muted"
                  >
                    <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CheckSquare className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        You've been assigned a task
                      </p>
                      <p className="text-sm text-muted-foreground">{task.title}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {task.priority}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> {task.timeAgo}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="p-2">
                <h5 className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  ADDED TO PROJECTS
                </h5>
                {addedProjects.map((project) => (
                  <Link
                    to={`/projects/${project.id}`}
                    key={project.id}
                    onClick={onClose}
                    className="flex items-start gap-3 rounded-md p-2 hover:bg-muted"
                  >
                    <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <FolderGit className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Added to project
                      </p>
                      <p className="text-sm text-muted-foreground">{project.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {project.role}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> {project.timeAgo}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="m-0 p-2">
            <div className="space-y-2">
              {assignedTasks.map((task) => (
                <Link
                  to={`/tasks/${task.id}`}
                  key={task.id}
                  onClick={onClose}
                  className="flex items-start gap-3 rounded-md p-2 hover:bg-muted"
                >
                  <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckSquare className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      You've been assigned a task
                    </p>
                    <p className="text-sm text-muted-foreground">{task.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {task.priority}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {task.timeAgo}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="m-0 p-2">
            <div className="space-y-2">
              {addedProjects.map((project) => (
                <Link
                  to={`/projects/${project.id}`}
                  key={project.id}
                  onClick={onClose}
                  className="flex items-start gap-3 rounded-md p-2 hover:bg-muted"
                >
                  <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FolderGit className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Added to project
                    </p>
                    <p className="text-sm text-muted-foreground">{project.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {project.role}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {project.timeAgo}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
        
        <div className="border-t p-2">
          <Button variant="outline" className="w-full text-xs" size="sm" asChild>
            <Link to="/settings?tab=notifications" onClick={onClose}>
              Manage notification settings
            </Link>
          </Button>
        </div>
      </Tabs>
    </div>
  );
};

export default NotificationsPanel;
