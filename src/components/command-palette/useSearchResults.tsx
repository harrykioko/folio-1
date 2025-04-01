
import { useState, useEffect } from "react";
import { searchAll, SearchResult } from "@/services/searchService";

// Default pages and actions
const defaultPages: SearchResult[] = [
  { id: "dashboard", type: "page", title: "Dashboard", icon: <BarChart2 className="h-4 w-4" />, route: "/dashboard" },
  { id: "projects", type: "page", title: "Projects", icon: <FolderGit className="h-4 w-4" />, route: "/projects" },
  { id: "accounts", type: "page", title: "Accounts", icon: <KeySquare className="h-4 w-4" />, route: "/accounts" },
  { id: "prompts", type: "page", title: "Prompt Library", icon: <Lightbulb className="h-4 w-4" />, route: "/prompts" },
  { id: "tasks", type: "page", title: "Tasks", icon: <CheckSquare className="h-4 w-4" />, route: "/tasks" },
  { id: "team", type: "page", title: "Team", icon: <Users className="h-4 w-4" />, route: "/team" },
  { id: "settings", type: "page", title: "Settings", icon: <Settings className="h-4 w-4" />, route: "/settings" },
  { id: "workspace", type: "page", title: "AI Workspace", icon: <Search className="h-4 w-4" />, route: "/workspace" }
];

const defaultActions: SearchResult[] = [
  { id: "new-project", type: "action", title: "Create New Project", icon: <PlusCircle className="h-4 w-4" />, route: "/projects/new" },
  { id: "new-task", type: "action", title: "Add Task", icon: <PlusCircle className="h-4 w-4" />, route: "/tasks/new" },
  { id: "new-prompt", type: "action", title: "Create Prompt", icon: <PlusCircle className="h-4 w-4" />, route: "/prompts/new" },
  { id: "new-account", type: "action", title: "Add Account", icon: <PlusCircle className="h-4 w-4" />, route: "/accounts/new" }
];

import { 
  BarChart2, 
  Users, 
  FolderGit, 
  KeySquare, 
  Lightbulb, 
  CheckSquare, 
  Settings,
  Search,
  PlusCircle,
} from "lucide-react";

interface SearchResultsState {
  pages: SearchResult[];
  projects: SearchResult[];
  tasks: SearchResult[];
  prompts: SearchResult[];
  accounts: SearchResult[];
  actions: SearchResult[];
}

interface UseSearchResultsProps {
  open: boolean;
  query: string;
}

export const useSearchResults = ({ open, query }: UseSearchResultsProps) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResultsState>({
    pages: defaultPages,
    projects: [],
    tasks: [],
    prompts: [],
    accounts: [],
    actions: defaultActions
  });

  useEffect(() => {
    if (!open) {
      // Don't try to modify query here since it's a prop
      setResults({
        pages: defaultPages,
        projects: [],
        tasks: [],
        prompts: [],
        accounts: [],
        actions: defaultActions
      });
      return;
    }

    const performSearch = async () => {
      // If empty query, show defaults
      if (!query.trim()) {
        setResults({
          pages: defaultPages,
          projects: [],
          tasks: [],
          prompts: [],
          accounts: [],
          actions: defaultActions
        });
        return;
      }

      setLoading(true);
      try {
        // Get search results from API
        const searchResults = await searchAll(query);
        
        // Filter default pages by query - use more lenient filtering by including case-insensitive partial matches
        const filteredPages = defaultPages.filter(page => 
          page.title.toLowerCase().includes(query.toLowerCase())
        );
        
        // Filter default actions by query - same lenient approach
        const filteredActions = defaultActions.filter(action => 
          action.title.toLowerCase().includes(query.toLowerCase())
        );

        console.log("Search query:", query);
        console.log("Filtered pages:", filteredPages);
        console.log("Search results:", searchResults);
        console.log("Filtered actions:", filteredActions);
        
        setResults({
          pages: filteredPages,
          projects: searchResults.projects || [],
          tasks: searchResults.tasks || [],
          prompts: searchResults.prompts || [],
          accounts: searchResults.accounts || [],
          actions: filteredActions
        });
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to avoid too many requests
    const debounce = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, open]);

  return { loading, results };
};

export default useSearchResults;
