
import React, { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "@/utils/tasks/types";
import { updateTask } from "@/utils/tasks";
import { toast } from "sonner";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "./TaskCard";
import { useUsers } from "@/hooks/useUsers";

interface KanbanBoardProps {
  tasks: Task[];
  refreshTasks: () => Promise<void>;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, refreshTasks }) => {
  const { users } = useUsers();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Group tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = Number(active.id);
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      setActiveTask(task);
    }
  };

  // Handle drag end
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || isUpdating) {
      setActiveTask(null);
      return;
    }
    
    const taskId = Number(active.id);
    const newStatus = String(over.id);
    const task = tasks.find(task => task.id === taskId);
    
    if (task && task.status !== newStatus) {
      // Only proceed if the task status is being changed to a valid status
      if (newStatus === 'todo' || newStatus === 'in_progress' || newStatus === 'completed') {
        try {
          setIsUpdating(true);
          console.log(`Updating task ${taskId} status from ${task.status} to ${newStatus}`);
          
          // Make API call with explicit type casting to ensure correct status value
          await updateTask(taskId, { 
            status: newStatus as 'todo' | 'in_progress' | 'completed' 
          });
          
          // Refresh tasks after successful update
          await refreshTasks();
          
          // Show success message
          toast.success(`Task moved to ${newStatus === 'todo' ? 'To Do' : newStatus === 'in_progress' ? 'In Progress' : 'Completed'}`);
        } catch (error) {
          console.error("Failed to update task status:", error);
          toast.error("Failed to update task status");
        } finally {
          setIsUpdating(false);
        }
      } else {
        console.error(`Invalid status value: ${newStatus}`);
        toast.error("Invalid status value");
      }
    }
    
    setActiveTask(null);
  };

  const getUserName = (userId: string | null) => {
    if (!userId) return "Unassigned";
    const user = users?.find(user => user.id === userId);
    return user?.full_name || user?.email || "Unknown User";
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <SortableContext items={todoTasks.map(task => task.id.toString())} strategy={verticalListSortingStrategy}>
          <KanbanColumn 
            id="todo" 
            title="To Do" 
            tasks={todoTasks}
            getUserName={getUserName}
          />
        </SortableContext>

        <SortableContext items={inProgressTasks.map(task => task.id.toString())} strategy={verticalListSortingStrategy}>
          <KanbanColumn 
            id="in_progress" 
            title="In Progress" 
            tasks={inProgressTasks}
            getUserName={getUserName}
          />
        </SortableContext>

        <SortableContext items={completedTasks.map(task => task.id.toString())} strategy={verticalListSortingStrategy}>
          <KanbanColumn 
            id="completed" 
            title="Completed" 
            tasks={completedTasks}
            getUserName={getUserName}
          />
        </SortableContext>

        <DragOverlay>
          {activeTask && (
            <div className="transform-gpu scale-105">
              <TaskCard 
                task={activeTask} 
                getUserName={getUserName}
                isDragging={true}
              />
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
