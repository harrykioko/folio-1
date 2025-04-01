
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator 
} from "@/components/ui/command";
import { AnimatePresence, motion } from "framer-motion";
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
  FileText,
  Globe,
  Github,
  Bookmark,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { searchAll } from "@/services/searchService";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SearchResult = {
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

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    pages: SearchResult[];
    projects: SearchResult[];
    tasks: SearchResult[];
    prompts: SearchResult[];
    accounts: SearchResult[];
    actions: SearchResult[];
  }>({
    pages: [],
    projects: [],
    tasks: [],
    prompts: [],
    accounts: [],
    actions: []
  });

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange, open]);

  // Default pages and actions (always available)
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

  // Search function
  useEffect(() => {
    if (!open) {
      setQuery("");
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
        const searchResults = await searchAll(query);
        
        // Filter default pages by query
        const filteredPages = defaultPages.filter(page => 
          page.title.toLowerCase().includes(query.toLowerCase())
        );
        
        // Filter default actions by query
        const filteredActions = defaultActions.filter(action => 
          action.title.toLowerCase().includes(query.toLowerCase())
        );
        
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

    const debounce = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, open]);

  const handleResultSelect = (result: SearchResult) => {
    onOpenChange(false);
    
    if (result.actionHandler) {
      result.actionHandler();
      return;
    }
    
    if (result.route) {
      navigate(result.route);
    }
  };

  // Render a preview for each result type
  const renderResultPreview = (result: SearchResult) => {
    switch (result.type) {
      case 'page':
        return (
          <div className="flex items-center">
            {result.icon}
            <span className="ml-2">{result.title}</span>
          </div>
        );
      
      case 'project':
        return (
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FolderGit className="h-4 w-4 mr-2 text-primary" />
                <span>{result.title}</span>
              </div>
              {result.status && (
                <Badge variant="outline" className="ml-2">{result.status}</Badge>
              )}
            </div>
            {result.description && (
              <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
            )}
            {typeof result.progress === 'number' && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{result.progress}%</span>
                </div>
                <Progress value={result.progress} className="h-1.5" />
              </div>
            )}
          </div>
        );
      
      case 'task':
        return (
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-primary" />
                <span>{result.title}</span>
              </div>
              {result.status && (
                <Badge variant={
                  result.status === 'Completed' ? 'default' : 
                  result.status === 'In Progress' ? 'secondary' : 
                  'outline'
                } className="ml-2">
                  {result.status}
                </Badge>
              )}
            </div>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              {result.description && <span className="mr-2">{result.description}</span>}
              {result.dueDate && (
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {result.dueDate}
                </span>
              )}
            </div>
          </div>
        );
      
      case 'prompt':
        return (
          <div className="flex flex-col">
            <div className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-primary" />
              <span>{result.title}</span>
            </div>
            {result.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{result.description}</p>
            )}
            {result.tags && result.tags.length > 0 && (
              <div className="flex gap-1 mt-1">
                {result.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
            )}
          </div>
        );
      
      case 'account':
        return (
          <div className="flex items-center">
            <KeySquare className="h-4 w-4 mr-2 text-primary" />
            <span>{result.title}</span>
            {result.description && (
              <span className="text-xs text-muted-foreground ml-2">({result.description})</span>
            )}
          </div>
        );
      
      case 'action':
        return (
          <div className="flex items-center">
            {result.icon}
            <span className="ml-2">{result.title}</span>
          </div>
        );
      
      default:
        return <span>{result.title}</span>;
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Search pages, projects, tasks, prompts..." 
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[70vh]">
        <AnimatePresence>
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-6 text-center text-sm"
            >
              Searching...
            </motion.div>
          ) : (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              
              {results.pages.length > 0 && (
                <CommandGroup heading="Pages">
                  {results.pages.map((page) => (
                    <CommandItem
                      key={page.id}
                      onSelect={() => handleResultSelect(page)}
                      className="flex items-center"
                    >
                      {renderResultPreview(page)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {results.actions.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Actions">
                    {results.actions.map((action) => (
                      <CommandItem
                        key={action.id}
                        onSelect={() => handleResultSelect(action)}
                        className="flex items-center"
                      >
                        {renderResultPreview(action)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
              
              {results.projects.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Projects">
                    {results.projects.map((project) => (
                      <CommandItem
                        key={project.id}
                        onSelect={() => handleResultSelect(project)}
                        className="py-2"
                      >
                        {renderResultPreview(project)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
              
              {results.tasks.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Tasks">
                    {results.tasks.map((task) => (
                      <CommandItem
                        key={task.id}
                        onSelect={() => handleResultSelect(task)}
                        className="py-2"
                      >
                        {renderResultPreview(task)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
              
              {results.prompts.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Prompts">
                    {results.prompts.map((prompt) => (
                      <CommandItem
                        key={prompt.id}
                        onSelect={() => handleResultSelect(prompt)}
                        className="py-2"
                      >
                        {renderResultPreview(prompt)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
              
              {results.accounts.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Accounts">
                    {results.accounts.map((account) => (
                      <CommandItem
                        key={account.id}
                        onSelect={() => handleResultSelect(account)}
                        className="py-2"
                      >
                        {renderResultPreview(account)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </>
          )}
        </AnimatePresence>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
