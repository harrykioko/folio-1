
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { getTaskById } from "@/utils/taskUtils";
import { getProjectById } from "@/utils/projectUtils";
import TaskForm from "@/components/tasks/TaskForm";
import TaskHeader from "@/components/tasks/TaskHeader";
import NewTaskHeader from "@/components/tasks/NewTaskHeader";
import TaskDetail from "@/components/tasks/TaskDetail";
import DeleteTaskDialog from "@/components/tasks/DeleteTaskDialog";
import { TaskFormValues } from "@/components/tasks/form/TaskFormSchema";
import { Card } from "@/components/ui/card";

const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Get the projectId from URL query parameters
  const projectIdFromQuery = searchParams.get('projectId');
  
  console.log("Current taskId param:", taskId);
  console.log("Current path:", location.pathname);
  console.log("Project ID from query:", projectIdFromQuery);
  
  // Check if we're on the new task route
  const isNewTask = location.pathname === "/tasks/new" || taskId === "new";
  
  console.log("Is new task:", isNewTask);
  
  // Find the task in our data
  const task = isNewTask ? null : getTaskById(taskId);
  
  // If projectId is in query, get the project details
  const linkedProject = projectIdFromQuery ? getProjectById(projectIdFromQuery) : null;
  
  console.log("Linked project:", linkedProject);
  
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
      
      // If the task was created from a project page, redirect back to that project
      if (projectIdFromQuery) {
        navigate(`/projects/${projectIdFromQuery}`);
      } else {
        navigate("/tasks");
      }
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

  // Render new task form
  if (isNewTask) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <NewTaskHeader linkedProject={linkedProject} />
        <Card className="p-6">
          <TaskForm 
            onSubmit={handleSubmit} 
            defaultProjectId={projectIdFromQuery || undefined}
          />
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
        <TaskDetail task={task} />
      )}

      <DeleteTaskDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default TaskDetails;
