
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Check, X } from "lucide-react";
import { Task } from "@/utils/tasks/types";
import { useTaskMutation } from "@/hooks/useTaskMutation";

interface TaskDescriptionProps {
  task: Task;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description || "");
  const { updateTask, isUpdating } = useTaskMutation();

  const handleSave = async () => {
    try {
      await updateTask(task.id, { description });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update description:", error);
    }
  };

  const handleCancel = () => {
    setDescription(task.description || "");
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Description</h3>
        {!isEditing && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-4">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a detailed description..."
            className="min-h-40 p-4"
          />
          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={handleSave}
              disabled={isUpdating}
            >
              <Check className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="prose dark:prose-invert max-w-none">
          {task.description ? (
            <p className="whitespace-pre-wrap">{task.description}</p>
          ) : (
            <p className="text-muted-foreground italic">
              No description provided. Click Edit to add one.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
