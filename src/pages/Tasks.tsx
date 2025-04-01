
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Plus, Search } from "lucide-react";
import { tasks } from "@/utils/taskUtils";

const Tasks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter tasks based on search query and active tab
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "to-do") return matchesSearch && task.status.toLowerCase() === "to do";
    if (activeTab === "in-progress") return matchesSearch && task.status.toLowerCase() === "in progress";
    if (activeTab === "completed") return matchesSearch && task.status.toLowerCase() === "completed";
    
    return matchesSearch;
  });

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
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "all" ? "All Tasks" : 
                 activeTab === "to-do" ? "To Do" : 
                 activeTab === "in-progress" ? "In Progress" : "Completed"}
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
                          <Badge variant="outline">{task.status}</Badge>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span>{task.project}</span>
                          <span className="mx-2">•</span>
                          <span>Due {task.dueDate}</span>
                          {task.assignee && (
                            <>
                              <span className="mx-2">•</span>
                              <span>Assigned to {task.assignee}</span>
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
