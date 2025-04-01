
import { 
  mockProjects, 
  mockTasks, 
  mockPrompts, 
  mockAccounts 
} from "./mockSearchData";

// Define types for our search results
export type SearchResult = {
  id: string | number;
  type: 'page' | 'project' | 'task' | 'prompt' | 'account' | 'domain' | 'repository' | 'action';
  title: string;
  description?: string;
  icon?: React.ReactNode;
  route?: string;
  progress?: number;
  status?: string;
  dueDate?: string;
  tags?: string[];
  assignedTo?: string;
  actionHandler?: () => void;
};

export type SearchResults = {
  projects: SearchResult[];
  tasks: SearchResult[];
  prompts: SearchResult[];
  accounts: SearchResult[];
  domains?: SearchResult[];
  repositories?: SearchResult[];
  files?: SearchResult[];
};

/**
 * Perform a search across all data sources
 * In a real implementation, this would connect to Supabase and use pg_trgm
 */
export const searchAll = async (query: string): Promise<SearchResults> => {
  // Simulate network delay for realistic behavior
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Normalize the query to lowercase for case-insensitive comparison
  const normalizedQuery = query.toLowerCase().trim();
  
  console.log("Searching with normalized query:", normalizedQuery);
  
  // This is where you would make a fetch call to your Supabase backend
  // For now, we'll filter mock data to simulate search results
  // Using more lenient filtering that allows partial matches
  const filteredProjects = mockProjects
    .filter(project => 
      project.title.toLowerCase().includes(normalizedQuery) || 
      (project.description && project.description.toLowerCase().includes(normalizedQuery)) ||
      (project.tags && project.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)))
    )
    .map(project => ({
      ...project,
      route: `/projects/${project.id}`
    }));
    
  const filteredTasks = mockTasks
    .filter(task => 
      task.title.toLowerCase().includes(normalizedQuery) ||
      (task.description && task.description.toLowerCase().includes(normalizedQuery)) ||
      (task.status && task.status.toLowerCase().includes(normalizedQuery))
    )
    .map(task => ({
      ...task,
      route: `/tasks/${task.id}`
    }));
    
  const filteredPrompts = mockPrompts
    .filter(prompt => 
      prompt.title.toLowerCase().includes(normalizedQuery) ||
      (prompt.description && prompt.description.toLowerCase().includes(normalizedQuery)) ||
      (prompt.tags && prompt.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)))
    )
    .map(prompt => ({
      ...prompt,
      route: `/prompts/${prompt.id}`
    }));
    
  const filteredAccounts = mockAccounts
    .filter(account => 
      account.title.toLowerCase().includes(normalizedQuery) ||
      (account.description && account.description.toLowerCase().includes(normalizedQuery))
    )
    .map(account => ({
      ...account,
      route: `/accounts/${account.id}`
    }));
  
  console.log("Search results:", {
    projects: filteredProjects.length,
    tasks: filteredTasks.length,
    prompts: filteredPrompts.length,
    accounts: filteredAccounts.length
  });
  
  return {
    projects: filteredProjects,
    tasks: filteredTasks,
    prompts: filteredPrompts,
    accounts: filteredAccounts
  };
};

// In a real implementation, you would have a function like this:
/*
export const searchWithSupabase = async (query: string): Promise<SearchResults> => {
  const supabase = getSupabaseClient();
  
  // Example of using pg_trgm for fuzzy search
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('id, title, description, status, progress')
    .textSearch('title', query, {
      type: 'websearch',
      config: 'english'
    });
  
  // Additional queries for other tables...
  
  return {
    projects: projects.map(p => ({
      id: p.id,
      type: 'project',
      title: p.title,
      description: p.description,
      status: p.status,
      progress: p.progress,
      route: `/projects/${p.id}`
    })),
    // ... other results
  };
};
*/
