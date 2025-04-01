
// Sample task data
export const tasks = [
  {
    id: 1,
    title: "Update project documentation",
    description: "Update the README and project documentation with the latest changes",
    status: "In Progress",
    priority: "High",
    project: "Project Alpha",
    assignee: "John Doe",
    dueDate: "Tomorrow",
    created: "2 days ago"
  },
  {
    id: 2,
    title: "Review prompt library structure",
    description: "Review the structure of the prompt library and suggest improvements",
    status: "To Do",
    priority: "Urgent",
    project: "AI Tools",
    assignee: "Emily Chen",
    dueDate: "Today",
    created: "Yesterday"
  },
  {
    id: 3,
    title: "Implement API integration",
    description: "Integrate the application with the new API endpoints",
    status: "In Progress",
    priority: "Medium",
    project: "Dashboard X",
    assignee: "Alex Smith",
    dueDate: "Next week",
    created: "3 days ago"
  },
  {
    id: 4,
    title: "Design new user onboarding flow",
    description: "Create wireframes and mockups for the new user onboarding flow",
    status: "To Do",
    priority: "High",
    project: "LMS Portal",
    assignee: "Sarah Johnson",
    dueDate: "In 2 days",
    created: "1 day ago"
  },
  {
    id: 5,
    title: "Update GitHub repository access",
    description: "Review and update access permissions for the GitHub repository",
    status: "To Do",
    priority: "Medium",
    project: "Project Alpha",
    assignee: "Tom Wilson",
    dueDate: "Today",
    created: "Yesterday"
  }
];

// Improved getTaskById function with better handling of edge cases
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
