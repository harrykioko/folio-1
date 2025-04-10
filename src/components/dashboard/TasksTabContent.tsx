
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const TasksTabContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Tasks</h2>
        <Button size="sm" asChild>
          <Link to="/tasks/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <ul className="space-y-4">
            {[
              { id: 1, title: "Update project documentation", project: "Project Alpha", due: "Tomorrow", priority: "High" },
              { id: 2, title: "Review prompt library structure", project: "AI Tools", due: "Today", priority: "Urgent" },
              { id: 3, title: "Implement API integration", project: "Dashboard X", due: "Next week", priority: "Medium" },
              { id: 4, title: "Design new user onboarding flow", project: "LMS Portal", due: "In 2 days", priority: "High" },
              { id: 5, title: "Update GitHub repository access", project: "Project Alpha", due: "Today", priority: "Medium" },
            ].map((task) => (
              <li key={task.id} className="flex items-center p-3 rounded-md hover:bg-secondary/50">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{task.title}</span>
                    <Badge variant={task.priority === "Urgent" ? "destructive" : task.priority === "High" ? "default" : "secondary"} className="text-xs">
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>{task.project}</span>
                    <span>•</span>
                    <span>Due {task.due}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <Button variant="outline" asChild>
            <Link to="/tasks">View All Tasks</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TasksTabContent;
