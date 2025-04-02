
import React, { useState, useEffect } from "react";
import { X, Search, CheckCircle2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTaskStatus } from "@/utils/tasks";
import { useTasks } from "@/hooks/useTasks";
import { useUsers } from "@/hooks/useUsers";
import { useProjects } from "@/hooks/useProjects";
import { Task } from "@/utils/tasks/types";

interface LinkTaskModalProps {
  open: boolean;
  onClose: () => void;
  onLinkTask: (taskId: number) => Promise<boolean>;
  currentTaskId: number;
  alreadyLinkedTaskIds: number[];
}

const LinkTaskModal: React.FC<LinkTaskModalProps> = ({
  open,
  onClose,
  onLinkTask,
  currentTaskId,
  alreadyLinkedTaskIds
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { tasks, isLoading } = useTasks();
  const { users } = useUsers();
  const { projects } = useProjects();
  
  // Reset filters when modal opens
  useEffect(() => {
    if (open) {
      setSearchTerm("");
      setProjectFilter("all");
      setStatusFilter("all");
      setAssigneeFilter("all");
    }
  }, [open]);
  
  // Filter tasks based on search term and filters
  const filteredTasks = tasks?.filter(task => {
    // Exclude current task and already linked tasks
    if (task.id === currentTaskId || alreadyLinkedTaskIds.includes(task.id)) {
      return false;
    }
    
    // Apply search term filter
    const matchesSearch = !searchTerm || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Apply project filter
    const matchesProject = projectFilter === "all" || 
      (projectFilter === "none" && !task.project_id) ||
      task.project_id?.toString() === projectFilter;
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    
    // Apply assignee filter
    const matchesAssignee = assigneeFilter === "all" || 
      (assigneeFilter === "unassigned" && !task.assigned_to) ||
      task.assigned_to === assigneeFilter;
    
    return matchesSearch && matchesProject && matchesStatus && matchesAssignee;
  }) || [];
  
  const handleLinkTask = async (taskId: number) => {
    setIsSubmitting(true);
    try {
      const success = await onLinkTask(taskId);
      if (success) {
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Link a Task</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {/* Search and filters */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks by title or description"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {/* Project filter */}
              <div>
                <Select
                  value={projectFilter}
                  onValueChange={setProjectFilter}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="none">No Project</SelectItem>
                    {projects?.map(project => (
                      <SelectItem key={project.id} value={project.id.toString()}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Status filter */}
              <div>
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Assignee filter */}
              <div>
                <Select
                  value={assigneeFilter}
                  onValueChange={setAssigneeFilter}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {users?.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.full_name || user.email || user.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Task list */}
          {isLoading ? (
            <div className="space-y-2 py-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No tasks found matching your criteria</p>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[350px] space-y-2 py-2 pr-1">
              {filteredTasks.map(task => {
                // Get the project name if project_id exists
                const projectName = task.project_id 
                  ? projects?.find(p => p.id === task.project_id)?.name 
                  : null;
                
                // Get the assignee if assigned_to exists
                const assignee = task.assigned_to 
                  ? users?.find(user => user.id === task.assigned_to) 
                  : null;
                
                return (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleLinkTask(task.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm mb-1 truncate">{task.title}</p>
                      <div className="flex items-center gap-2">
                        <Badge className="text-xs">{formatTaskStatus(task.status)}</Badge>
                        {projectName && (
                          <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                            {projectName}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-2">
                      {assignee && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={assignee.avatar_url || undefined} alt={assignee.full_name || 'User'} />
                          <AvatarFallback className="text-xs">
                            {assignee.full_name ? getInitials(assignee.full_name) : 'U'}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <CheckCircle2 className="h-5 w-5 opacity-0 hover:opacity-100 text-primary" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkTaskModal;
