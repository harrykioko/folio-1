
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
  const doneTasks = tasks.filter(task => task.status === 'done');

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
    
    if (!over) {
      setActiveTask(null);
      return;
    }
    
    const taskId = Number(active.id);
    const newStatus = String(over.id);
    const task = tasks.find(task => task.id === taskId);
    
    if (task && task.status !== newStatus) {
      try {
        await updateTask(taskId, { status: newStatus as 'todo' | 'in_progress' | 'done' });
        refreshTasks();
        toast.success(`Task moved to ${newStatus === 'todo' ? 'To Do' : newStatus === 'in_progress' ? 'In Progress' : 'Completed'}`);
      } catch (error) {
        toast.error("Failed to update task status");
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

        <SortableContext items={doneTasks.map(task => task.id.toString())} strategy={verticalListSortingStrategy}>
          <KanbanColumn 
            id="done" 
            title="Completed" 
            tasks={doneTasks}
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
