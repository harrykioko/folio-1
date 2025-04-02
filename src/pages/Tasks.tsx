
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Plus, Search, Loader2 } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { useUsers } from "@/hooks/useUsers";
import { formatTaskStatus } from "@/utils/tasks";
import { Task } from "@/utils/tasks/types";

const Tasks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { tasks, isLoading, error } = useTasks();
  const { users, isLoading: isLoadingUsers } = useUsers();

  // Function to get the user's full name
  const getUserName = (userId: string | null) => {
    if (!userId) return "Unassigned";
    if (isLoadingUsers) return "Loading...";
    
    const user = users?.find(user => user.id === userId);
    return user?.full_name || user?.email || "Unknown User";
  };

  // Filter tasks based on search query and active tab
  const filteredTasks = tasks ? tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (task.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "to-do") return matchesSearch && task.status === "todo";
    if (activeTab === "in-progress") return matchesSearch && task.status === "in_progress";
    if (activeTab === "done") return matchesSearch && task.status === "done";
    
    return matchesSearch;
  }) : [];

  // Function to determine the badge variant based on priority
  const getPriorityVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "destructive";
      case "high":
        return "default";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "secondary";
    }
  };

  // Function to format the status for display
  const getDisplayStatus = (status: string) => {
    return formatTaskStatus(status);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-destructive mb-4">Failed to load tasks</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <Button asChild>
          <Link to="/tasks/new">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="to-do">To Do</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "all" ? "All Tasks" : 
                 activeTab === "to-do" ? "To Do" : 
                 activeTab === "in-progress" ? "In Progress" : "Done"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">No tasks found</p>
                  <Button asChild>
                    <Link to="/tasks/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Task
                    </Link>
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {filteredTasks.map((task) => (
                    <li key={task.id} className="border rounded-md p-4 hover:shadow-sm transition-shadow">
                      <Link to={`/tasks/${task.id}`} className="block">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{task.title}</span>
                            <Badge variant={getPriorityVariant(task.priority)} className="text-xs">
                              {task.priority}
                            </Badge>
                          </div>
                          <Badge variant="outline">{getDisplayStatus(task.status)}</Badge>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {task.project_id && (
                            <span>Project ID: {task.project_id}</span>
                          )}
                          {task.deadline && (
                            <>
                              <span className="mx-2">•</span>
                              <span>Due {new Date(task.deadline).toLocaleDateString()}</span>
                            </>
                          )}
                          {task.assigned_to && (
                            <>
                              <span className="mx-2">•</span>
                              <span>Assigned to {getUserName(task.assigned_to)}</span>
                            </>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;
