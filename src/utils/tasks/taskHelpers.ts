
import type { Task } from "./types";

// Helper function to convert database status to UI-friendly format
export const formatTaskStatus = (status: Task['status']): string => {
  switch (status) {
    case 'todo': return 'To Do';
    case 'in_progress': return 'In Progress';
    case 'done': return 'Completed';
    default: return status;
  }
};

// Helper function to convert UI-friendly format back to database status
export const parseTaskStatus = (status: string): Task['status'] => {
  switch (status.toLowerCase()) {
    case 'to do': return 'todo';
    case 'in progress': return 'in_progress';
    case 'completed':
    case 'done': return 'done';
    default: return 'todo';
  }
};

// Helper function to convert UI-friendly priority to database priority
export const parseTaskPriority = (priority: string): Task['priority'] => {
  switch (priority.toLowerCase()) {
    case 'low': return 'low';
    case 'medium': return 'medium';
    case 'high': return 'high';
    case 'urgent': return 'urgent';
    default: return 'medium';
  }
};
