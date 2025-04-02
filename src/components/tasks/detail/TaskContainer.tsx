
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskForm from "@/components/tasks/TaskForm";
import TaskHeader from "@/components/tasks/detail/TaskHeader";
import NewTaskHeader from "@/components/tasks/NewTaskHeader";
import TaskDetail from "@/components/tasks/detail/TaskDetail";
import DeleteTaskDialog from "@/components/tasks/DeleteTaskDialog";
import { Card } from "@/components/ui/card";
import { useTaskDetail } from "./useTaskDetail";

const TaskContainer: React.FC = () => {
  const { 
    taskId, 
    isNewTask, 
    projectIdFromQuery,
    isEditMode, setIsEditMode,
    isDeleteDialogOpen, setIsDeleteDialogOpen,
    task, formattedTask,
    isLoading, isSubmitting,
    error,
    handleSubmit,
    handleDeleteTask,
    navigate
  } = useTaskDetail();

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

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      <TaskHeader
        task={task}
        formattedTask={formattedTask}
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
        <TaskDetail 
          task={task}
          formattedTask={formattedTask}
        />
      )}

      <DeleteTaskDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default TaskContainer;
