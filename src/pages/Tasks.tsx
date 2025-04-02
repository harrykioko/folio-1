
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Loader2, Filter } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/utils/tasks/types";
import KanbanBoard from "@/components/tasks/kanban/KanbanBoard";
import TaskFilters from "@/components/tasks/TaskFilters";

const Tasks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    project: null,
    assignee: null,
    priority: null
  });
  
  const { tasks, isLoading, error, refreshTasks } = useTasks();

  // Filter tasks based on search query and filters
  const filteredTasks = tasks ? tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (task.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    
    const matchesProject = !filters.project || task.project_id === filters.project;
    const matchesAssignee = !filters.assignee || task.assigned_to === filters.assignee;
    const matchesPriority = !filters.priority || task.priority === filters.priority;
    
    return matchesSearch && matchesProject && matchesAssignee && matchesPriority;
  }) : [];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-destructive mb-4">Failed to load tasks</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <Button asChild>
          <Link to="/tasks/new">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center sticky top-0 z-10 bg-background pt-2 pb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {filterOpen && (
        <TaskFilters 
          filters={filters} 
          setFilters={setFilters} 
        />
      )}

      <div className="h-full min-h-[calc(100vh-220px)] pb-20">
        <KanbanBoard 
          tasks={filteredTasks} 
          refreshTasks={refreshTasks}
        />
      </div>
    </div>
  );
};

export default Tasks;
