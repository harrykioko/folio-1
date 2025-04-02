
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { CardTitle, CardDescription } from "@/components/ui/card";

interface DeleteProjectDialogProps {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = ({
  onClose,
  onDelete,
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <CardTitle className="text-xl">Delete Project</CardTitle>
        <CardDescription>
          Are you sure you want to delete this project? This action cannot be undone.
        </CardDescription>
      </DialogHeader>
      
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Deleting this project will remove all associated data, including tasks, credentials, and settings.
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Delete Project
        </Button>
      </div>
    </DialogContent>
  );
};

export default DeleteProjectDialog;
