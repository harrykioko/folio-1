
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { getTaskById } from "@/utils/taskUtils";
import TaskForm from "@/components/tasks/TaskForm";
import TaskHeader from "@/components/tasks/TaskHeader";
import { TaskFormValues } from "@/components/tasks/form/TaskFormSchema";
import { Card } from "@/components/ui/card";

const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  console.log("Current taskId param:", taskId);
  console.log("Current path:", location.pathname);
  
  // Check if we're on the new task route
  const isNewTask = location.pathname === "/tasks/new" || taskId === "new";
  
  console.log("Is new task:", isNewTask);
  
  // Find the task in our data
  const task = isNewTask ? null : getTaskById(taskId);
  
  // Check if task was not found
  useEffect(() => {
    if (!task && !isNewTask) {
      console.log("Task not found, taskId:", taskId);
      navigate("/tasks");
      toast.error("Task not found");
    }
  }, [task, isNewTask, navigate, taskId]);

  const handleSubmit = (data: TaskFormValues) => {
    if (isNewTask) {
      console.log("New task data:", data);
      // In a real app, we would save this to the database
      toast.success("Task created successfully!");
      navigate("/tasks");
    } else {
      console.log("Updated task data:", data);
      // In a real app, we would update this in the database
      toast.success("Task updated successfully!");
      setIsEditMode(false);
    }
  };

  const handleDeleteTask = () => {
    // In a real app, we would delete from the database
    toast.success("Task deleted successfully!");
    navigate("/tasks");
  };

  // Handle the case when we're creating a new task
  if (isNewTask) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Create New Task</h1>
          <p className="text-muted-foreground mt-2">
            Fill out the form below to create a new task.
          </p>
        </div>
        <Card className="p-6">
          <TaskForm onSubmit={handleSubmit} />
        </Card>
      </div>
    );
  }

  // If task is not found and we're not creating a new one, return null
  if (!task) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <TaskHeader
        title={task.title}
        status={task.status}
        priority={task.priority}
        project={task.project}
        assignee={task.assignee}
        dueDate={task.dueDate}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      
      {isEditMode ? (
        <Card className="p-6">
          <TaskForm 
            task={task} 
            onSubmit={handleSubmit} 
            onCancel={() => setIsEditMode(false)} 
          />
        </Card>
      ) : (
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
      )}
    </div>
  );
};

export default TaskDetails;
