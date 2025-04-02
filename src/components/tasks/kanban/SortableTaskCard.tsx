
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/utils/tasks/types";
import TaskCard from "./TaskCard";

interface SortableTaskCardProps {
  task: Task;
  getUserName: (userId: string | null) => string;
}

export function SortableTaskCard({ task, getUserName }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id.toString(),
    data: {
      task
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`touch-none ${isDragging ? 'z-10' : ''}`}
    >
      <TaskCard 
        task={task} 
        getUserName={getUserName}
        isDragging={isDragging}
      />
    </div>
  );
}
