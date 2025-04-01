
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
import { createTask, updateTask, deleteTask } from "@/utils/supabaseTasks";

const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const handleSubmit = async (data: TaskFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Map form values to the expected Supabase field structure
      const formattedData = {
        title: data.title,
        description: data.description,
        project_id: data.projectId ? Number(data.projectId) : null,
        assigned_to: data.assignee === "unassigned" ? null : data.assignee,
        priority: data.priority.toLowerCase(),
        deadline: data.dueDate || null,
        status: parseTaskStatus(data.status)
      };
      
      console.log("New task data:", formattedData);
      
      if (isNewTask) {
        // Create new task in Supabase
        await createTask(formattedData);
        toast.success("Task created successfully!");
        
        // If the task was created from a project page, redirect back to that project
        if (projectIdFromQuery) {
          navigate(`/projects/${projectIdFromQuery}`);
        } else {
          navigate("/tasks");
        }
      } else {
        // Update existing task in Supabase
        if (taskId) {
          await updateTask(Number(taskId), formattedData);
          toast.success("Task updated successfully!");
          setIsEditMode(false);
        }
      }
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async () => {
    try {
      if (taskId) {
        await deleteTask(Number(taskId));
        toast.success("Task deleted successfully!");
        navigate("/tasks");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  // Helper function to convert UI-friendly format back to database status
  const parseTaskStatus = (status: string): string => {
    switch (status.toLowerCase()) {
      case "to do": return "todo";
      case "in progress": return "in_progress";
      case "completed": return "done";
      default: return "todo";
    }
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
