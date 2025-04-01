
import { tasks } from './mockTasks';

// Function to get a task by ID
export const getTaskById = (id: string | number | undefined | null) => {
  // Return undefined if id is undefined or null
  if (id === undefined || id === null) {
    return undefined;
  }
  
  // If id is "new", return undefined as this is a special case
  if (id === "new") {
    return undefined;
  }
  
  // Safely convert id to number for comparison if it's a string
  const idNum = typeof id === 'string' ? parseInt(id, 10) : id;
  
  // Handle NaN case
  if (isNaN(idNum)) {
    return undefined;
  }
  
  // Find the task with the matching id
  return tasks.find(task => task.id === idNum);
};

// Function to get tasks by project ID
export const getTasksByProjectId = (projectId: string | number | undefined | null) => {
  if (projectId === undefined || projectId === null) {
    return [];
  }
  
  const projectIdString = projectId.toString();
  return tasks.filter(task => task.projectId === projectIdString);
};
