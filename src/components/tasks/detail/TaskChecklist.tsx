
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Plus, X, Loader2 } from "lucide-react";
import { useSubtasks } from "@/hooks/useSubtasks";

interface TaskChecklistProps {
  taskId: number;
}

const TaskChecklist: React.FC<TaskChecklistProps> = ({ taskId }) => {
  const { 
    subtasks, 
    isLoading, 
    error, 
    getCompletionStats, 
    addSubtask, 
    toggleSubtaskCompletion, 
    removeSubtask 
  } = useSubtasks(taskId);
  
  const [newItemTitle, setNewItemTitle] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const stats = getCompletionStats();
  
  const handleAddItem = async () => {
    if (newItemTitle.trim()) {
      try {
        setIsSubmitting(true);
        await addSubtask({
          title: newItemTitle.trim(),
          is_complete: false
        });
        
        setNewItemTitle("");
        setIsAddingItem(false);
      } catch (error) {
        console.error("Failed to add subtask:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const handleToggleComplete = async (id: string, currentState: boolean) => {
    try {
      await toggleSubtaskCompletion(id, !currentState);
    } catch (error) {
      console.error("Failed to toggle subtask completion:", error);
    }
  };
  
  const handleRemoveItem = async (id: string) => {
    try {
      await removeSubtask(id);
    } catch (error) {
      console.error("Failed to remove subtask:", error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p className="text-destructive mb-2">Failed to load checklist items</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {subtasks && subtasks.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{stats.completed} of {stats.total} completed</span>
            <span>{stats.percentage}%</span>
          </div>
          <Progress value={stats.percentage} className="h-2" />
        </div>
      )}
      
      <ul className="space-y-2">
        {subtasks?.map(item => (
          <li key={item.id} className="flex items-center gap-2 group">
            <Checkbox 
              id={`checklist-item-${item.id}`} 
              checked={item.is_complete}
              onCheckedChange={() => handleToggleComplete(item.id, item.is_complete)}
            />
            <label 
              htmlFor={`checklist-item-${item.id}`}
              className={`flex-grow ${item.is_complete ? 'text-muted-foreground line-through' : ''}`}
            >
              {item.title}
            </label>
            <Button 
              variant="ghost" 
              size="icon" 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveItem(item.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
      
      {isAddingItem ? (
        <div className="flex gap-2">
          <Input
            placeholder="Add a checklist item..."
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddItem();
              if (e.key === "Escape") {
                setIsAddingItem(false);
                setNewItemTitle("");
              }
            }}
            autoFocus
            disabled={isSubmitting}
          />
          <Button onClick={handleAddItem} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => {
              setIsAddingItem(false);
              setNewItemTitle("");
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setIsAddingItem(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Checklist Item
        </Button>
      )}
      
      {(!subtasks || subtasks.length === 0) && !isAddingItem && (
        <div className="text-center text-muted-foreground py-8">
          No checklist items yet. Add one to track subtasks or steps for completion.
        </div>
      )}
    </div>
  );
};

export default TaskChecklist;
