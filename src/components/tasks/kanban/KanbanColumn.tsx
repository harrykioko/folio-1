
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Task } from "@/utils/tasks/types";
import { SortableTaskCard } from "./SortableTaskCard";

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  getUserName: (userId: string | null) => string;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  id, 
  title, 
  tasks,
  getUserName
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`flex flex-col h-full rounded-xl ${
        isOver 
          ? 'bg-accent/70 ring-2 ring-primary/20 shadow-lg' 
          : 'bg-muted/50'
      } transition-all duration-200`}
    >
      <div className="p-4 border-b sticky top-0 backdrop-blur-sm bg-background/50 rounded-t-xl z-10">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            {title} <span className="text-muted-foreground ml-2 text-sm">({tasks.length})</span>
          </h3>
        </div>
      </div>
      
      <div className="p-3 flex-grow overflow-auto max-h-[calc(100vh-280px)] scrollbar-thin">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-24 border border-dashed rounded-lg bg-background/50 text-muted-foreground text-center p-4">
            No tasks
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <SortableTaskCard
                key={task.id}
                task={task}
                getUserName={getUserName}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
