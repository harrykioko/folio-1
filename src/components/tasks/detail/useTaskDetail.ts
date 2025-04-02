import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { TaskFormValues } from "@/components/tasks/form/TaskFormSchema";
import { useProjects } from "@/hooks/useProjects";
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

export const useTaskDetail = () => {
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
  
  const projectIdFromQuery = searchParams.get('projectId');
  const isNewTask = location.pathname === "/tasks/new" || taskId === "new";
  
  const { projects, isLoading: isLoadingProjects } = useProjects();
  
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

  const handleSubmit = async (data: TaskFormValues) => {
    try {
      setIsSubmitting(true);
      
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
          
          const updatedTask = await fetchTaskById(Number(taskId));
          setTask(updatedTask);
          
          toast.success("Task updated successfully!");
          setIsEditMode(false);
        }
      }
    } catch (error) {
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
    }
  };

  const getProjectName = (projectId: number | null) => {
    if (!projectId) return "No Project";
    if (isLoadingProjects) return `Project #${projectId}`;
    
    const project = projects?.find(p => p.id === projectId);
    return project ? project.name : `Project #${projectId}`;
  };

  const formattedTask = task ? {
    id: task.id,
    title: task.title,
    description: task.description,
    status: formatTaskStatus(task.status),
    priority: task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
    project: task.project_id ? getProjectName(task.project_id) : "No Project",
    projectId: task.project_id,
    assignee: task.assigned_to,
    dueDate: task.deadline ? new Date(task.deadline).toLocaleDateString() : "No due date",
    created: task.created_at ? new Date(task.created_at).toLocaleDateString() : undefined
  } : null;

  return {
    taskId,
    isNewTask,
    projectIdFromQuery,
    isEditMode,
    setIsEditMode,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isSubmitting,
    isLoading,
    task,
    formattedTask,
    error,
    handleSubmit,
    handleDeleteTask,
    navigate
  };
};
