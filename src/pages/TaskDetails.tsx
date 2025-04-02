
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import TaskForm from "@/components/tasks/TaskForm";
import TaskHeader from "@/components/tasks/TaskHeader";
import NewTaskHeader from "@/components/tasks/NewTaskHeader";
import TaskDetail from "@/components/tasks/TaskDetail";
import DeleteTaskDialog from "@/components/tasks/DeleteTaskDialog";
import { TaskFormValues } from "@/components/tasks/form/TaskFormSchema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import { 
  createTask, 
  updateTask, 
  deleteTask, 
  fetchTaskById,
  parseTaskStatus, 
  parseTaskPriority,
  formatTaskStatus,
  type Task
} from "@/utils/tasks";

const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { users, isLoading: isLoadingUsers } = useUsers();
  
  const projectIdFromQuery = searchParams.get('projectId');
  const isNewTask = location.pathname === "/tasks/new" || taskId === "new";
  
  useEffect(() => {
    const loadTask = async () => {
      if (isNewTask) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        if (!taskId) {
          throw new Error("Task ID is required");
        }
        
        const fetchedTask = await fetchTaskById(Number(taskId));
        setTask(fetchedTask);
        setError(null);
      } catch (err) {
        console.error("Error loading task:", err);
        setError("Task not found or you don't have permission to view it");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTask();
  }, [taskId, isNewTask]);

  useEffect(() => {
    if (!isLoading && !task && !isNewTask) {
      navigate("/tasks");
      toast.error("Task not found");
    }
  }, [task, isNewTask, navigate, isLoading]);

  const getUserName = (userId: string | null) => {
    if (!userId) return "Unassigned";
    if (isLoadingUsers) return "Loading...";
    
    const user = users?.find(user => user.id === userId);
    return user?.full_name || user?.email || "Unknown User";
  };

  const handleSubmit = async (data: TaskFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Use the helper functions to ensure correct typing
      const priority = parseTaskPriority(data.priority);
      const status = parseTaskStatus(data.status);
      
      const formattedData = {
        title: data.title,
        description: data.description || "",
        project_id: data.projectId ? Number(data.projectId) : null,
        assigned_to: data.assignee === "unassigned" ? null : data.assignee,
        priority,
        deadline: data.dueDate || null,
        status
      };
      
      if (isNewTask) {
        await createTask(formattedData);
        toast.success("Task created successfully!");
        
        if (projectIdFromQuery) {
          navigate(`/projects/${projectIdFromQuery}`);
        } else {
          navigate("/tasks");
        }
      } else {
        if (taskId) {
          await updateTask(Number(taskId), formattedData);
          
          // Refresh the task data
          const updatedTask = await fetchTaskById(Number(taskId));
          setTask(updatedTask);
          
          toast.success("Task updated successfully!");
          setIsEditMode(false);
        }
      }
    } catch (error) {
      console.error("Error saving task:", error);
      // Toast is now handled in the createTask/updateTask functions
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
      // Toast is now handled in the deleteTask function
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading task details...</p>
      </div>
    );
  }

  // New task form
  if (isNewTask) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <NewTaskHeader linkedProject={null} />
        <Card className="p-6">
          <TaskForm 
            onSubmit={handleSubmit} 
            defaultProjectId={projectIdFromQuery || undefined}
            isSubmitting={isSubmitting}
          />
        </Card>
      </div>
    );
  }

  // Error state
  if (error || !task) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-destructive mb-4">{error || "Task not found"}</p>
        <Button variant="outline" onClick={() => navigate("/tasks")}>
          Back to Tasks
        </Button>
      </div>
    );
  }

  // Format the task for display components
  const formattedTask = {
    id: task.id,
    title: task.title,
    description: task.description,
    status: formatTaskStatus(task.status),
    priority: task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
    project: task.project_id ? `Project #${task.project_id}` : "No Project",
    projectId: task.project_id,
    assignee: task.assigned_to,
    dueDate: task.deadline ? new Date(task.deadline).toLocaleDateString() : "No due date",
    created: task.created_at ? new Date(task.created_at).toLocaleDateString() : undefined
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <TaskHeader
        title={formattedTask.title}
        status={formattedTask.status}
        priority={formattedTask.priority}
        project={formattedTask.project}
        assignee={formattedTask.assignee}
        dueDate={formattedTask.dueDate}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      
      {isEditMode ? (
        <Card className="p-6">
          <TaskForm 
            task={{
              ...formattedTask,
              description: task.description || "",
              assignee: task.assigned_to || "unassigned"
            }}
            onSubmit={handleSubmit} 
            onCancel={() => setIsEditMode(false)}
            isSubmitting={isSubmitting}
          />
        </Card>
      ) : (
        <TaskDetail task={formattedTask} />
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
