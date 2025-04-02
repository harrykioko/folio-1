
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Project } from "@/utils/supabaseProjects";
import { getTasksByProjectId } from "@/utils/tasks/mockTaskUtils";

interface ProjectLeftPanelProps {
  project: Project;
}

const ProjectLeftPanel: React.FC<ProjectLeftPanelProps> = ({ project }) => {
  const navigate = useNavigate();
  const [openTasks, setOpenTasks] = useState(true);
  const [taskFilter, setTaskFilter] = useState<"my" | "all">("my");
  
  // Get tasks for this project
  const tasks = getTasksByProjectId(project.id);
  
  // For demo purposes, determine completed percentage
  const progress = project.progress || 30; // Default to 30% if not specified
  
  // Handle adding a new task
  const handleAddTask = () => {
    navigate(`/tasks/new?projectId=${project.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Timeline Card */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Start Date:</span>
            </div>
            <span className="font-medium">{project.startDate || "Not set"}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Due Date:</span>
            </div>
            <span className="font-medium">{project.dueDate || "Not set"}</span>
          </div>
        </CardContent>
      </Card>

      {/* Progress Card */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={progress} className="h-3 rounded-full bg-secondary/40" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Overall Completion</span>
            <span>{progress}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Add Task Button */}
      <Button 
        className="w-full rounded-xl h-12 shadow-md transition-all hover:shadow-lg"
        onClick={handleAddTask}
      >
        <Plus className="mr-2 h-5 w-5" />
        Add Task
      </Button>

      {/* Tasks Section */}
      <Collapsible open={openTasks} onOpenChange={setOpenTasks} className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tasks</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
              {openTasks ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-4">
          {/* Task filter tabs */}
          <div className="flex rounded-lg overflow-hidden border">
            <Button 
              variant={taskFilter === "my" ? "default" : "ghost"} 
              className="flex-1 rounded-none text-sm"
              onClick={() => setTaskFilter("my")}
            >
              My Tasks
            </Button>
            <Button 
              variant={taskFilter === "all" ? "default" : "ghost"} 
              className="flex-1 rounded-none text-sm"
              onClick={() => setTaskFilter("all")}
            >
              All Tasks
            </Button>
          </div>

          {/* Task list */}
          <Card className="rounded-xl">
            <CardContent className="p-3">
              {tasks.length > 0 ? (
                <div className="space-y-2">
                  {tasks.slice(0, 4).map((task) => (
                    <div key={task.id} className="flex items-start space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox id={`task-${task.id}`} />
                      <div className="space-y-1">
                        <label 
                          htmlFor={`task-${task.id}`} 
                          className="font-medium text-sm cursor-pointer"
                        >
                          {task.title}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {task.status} • Due {task.dueDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">No tasks yet.</p>
                </div>
              )}

              {tasks.length > 4 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-2 text-xs"
                  onClick={() => navigate(`/projects/${project.id}?tab=tasks`)}
                >
                  View all tasks
                </Button>
              )}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ProjectLeftPanel;
