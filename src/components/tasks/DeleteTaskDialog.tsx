
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the task and remove it from the system.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTaskDialog;
