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
import { 
  createTask, 
  updateTask, 
  deleteTask, 
  parseTaskStatus, 
  parseTaskPriority,
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
  
  const projectIdFromQuery = searchParams.get('projectId');
  
  console.log("Current taskId param:", taskId);
  console.log("Current path:", location.pathname);
  console.log("Project ID from query:", projectIdFromQuery);
  
  const isNewTask = location.pathname === "/tasks/new" || taskId === "new";
  
  console.log("Is new task:", isNewTask);
  
  const task = isNewTask ? null : getTaskById(taskId);
  
  const linkedProject = projectIdFromQuery ? getProjectById(projectIdFromQuery) : null;
  
  console.log("Linked project:", linkedProject);
  
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
      
      console.log("New task data:", formattedData);
      
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
