
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  isEditing: boolean;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  isEditing, 
  onCancel,
  isSubmitting = false
}) => {
  return (
    <div className="flex justify-end gap-2">
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isEditing ? "Updating..." : "Creating..."}
          </>
        ) : (
          isEditing ? "Update Task" : "Create Task"
        )}
      </Button>
    </div>
  );
};

export default FormActions;
