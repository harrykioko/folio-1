
import React from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isEditing: boolean;
  onCancel?: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isEditing, onCancel }) => {
  return (
    <div className="flex justify-end gap-2">
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      )}
      <Button type="submit">
        {isEditing ? "Update Task" : "Create Task"}
      </Button>
    </div>
  );
};

export default FormActions;
