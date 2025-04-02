
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Plus, X } from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  isComplete: boolean;
}

interface TaskChecklistProps {
  taskId: number;
}

const TaskChecklist: React.FC<TaskChecklistProps> = ({ taskId }) => {
  // This will be replaced with actual data loading from API once backend is set up
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);
  
  const completedCount = items.filter(item => item.isComplete).length;
  const progressPercentage = items.length > 0 ? (completedCount / items.length) * 100 : 0;
  
  const handleAddItem = () => {
    if (newItemTitle.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        title: newItemTitle.trim(),
        isComplete: false
      };
      
      setItems([...items, newItem]);
      setNewItemTitle("");
      setIsAddingItem(false);
    }
  };
  
  const handleToggleComplete = (id: string) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };
  
  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  return (
    <div className="space-y-4">
      {items.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{completedCount} of {items.length} completed</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}
      
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="flex items-center gap-2 group">
            <Checkbox 
              id={`checklist-item-${item.id}`} 
              checked={item.isComplete}
              onCheckedChange={() => handleToggleComplete(item.id)}
            />
            <label 
              htmlFor={`checklist-item-${item.id}`}
              className={`flex-grow ${item.isComplete ? 'text-muted-foreground line-through' : ''}`}
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
          />
          <Button onClick={handleAddItem}>Add</Button>
          <Button 
            variant="ghost" 
            onClick={() => {
              setIsAddingItem(false);
              setNewItemTitle("");
            }}
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
      
      {items.length === 0 && !isAddingItem && (
        <div className="text-center text-muted-foreground py-8">
          No checklist items yet. Add one to track subtasks or steps for completion.
        </div>
      )}
    </div>
  );
};

export default TaskChecklist;
