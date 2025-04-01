
export const projects = [
  { 
    id: 1, 
    name: "Project Alpha", 
    description: "AI-powered content generation platform", 
    progress: 75, 
    team: 4,
    status: "active",
    domains: ["alpha-project.com", "project-alpha.org"],
    social: ["twitter", "instagram", "linkedin"],
    hasGithub: true,
    startDate: "Feb 2023",
    dueDate: "Dec 2023"
  },
  { 
    id: 2, 
    name: "Dashboard X", 
    description: "Analytics dashboard for marketing teams", 
    progress: 45, 
    team: 3,
    status: "active",
    domains: ["dashboardx.io"],
    social: ["twitter", "linkedin"],
    hasGithub: true,
    startDate: "Apr 2023",
    dueDate: "Jan 2024"
  },
  { 
    id: 3, 
    name: "LMS Portal", 
    description: "Learning management system", 
    progress: 90, 
    team: 5,
    status: "completed",
    domains: ["learn-portal.com", "lmsportal.edu"],
    social: ["instagram", "linkedin"],
    hasGithub: true,
    startDate: "Jan 2023",
    dueDate: "Nov 2023"
  },
  { 
    id: 4, 
    name: "Content Hub", 
    description: "Content management and distribution platform", 
    progress: 30, 
    team: 2,
    status: "active",
    domains: ["contenthub.co"],
    social: ["twitter", "instagram"],
    hasGithub: false,
    startDate: "Jul 2023",
    dueDate: "Mar 2024"
  },
  { 
    id: 5, 
    name: "Analytics Engine", 
    description: "Data analytics and visualization tool", 
    progress: 60, 
    team: 4,
    status: "active",
    domains: ["analytics-engine.tech"],
    social: ["twitter", "linkedin"],
    hasGithub: true,
    startDate: "Mar 2023",
    dueDate: "Dec 2023"
  },
  { 
    id: 6, 
    name: "Support Desk", 
    description: "Customer support ticketing system", 
    progress: 100, 
    team: 3,
    status: "completed",
    domains: ["support-desk.app"],
    social: ["twitter"],
    hasGithub: true,
    startDate: "Dec 2022",
    dueDate: "Sep 2023"
  }
];

// Fixed the getProjectById function to handle null/undefined projectId
export const getProjectById = (id: string | number | undefined | null) => {
  // Return undefined if id is undefined or null
  if (id === undefined || id === null) {
    return undefined;
  }
  
  // Safely convert id to string for comparison
  const idStr = String(id);
  
  // Find the project with the matching id
  return projects.find(project => project.id.toString() === idStr);
};
