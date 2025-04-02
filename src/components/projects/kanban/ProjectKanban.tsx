
import React, { useState, useEffect } from "react";
import { Task } from "@/utils/tasks/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useUsers } from "@/hooks/useUsers";
import { fetchTasksByProjectId } from "@/utils/tasks";

interface ProjectKanbanProps {
  projectId: number;
}

const ProjectKanban: React.FC<ProjectKanbanProps> = ({ projectId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { users } = useUsers();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const fetchedTasks = await fetchTasksByProjectId(projectId);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [projectId]);

  // Group tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const renderTaskCard = (task: Task) => {
    const assignee = task.assigned_to 
      ? users?.find(user => user.id === task.assigned_to) 
      : null;

    const getInitials = (name: string | null) => {
      if (!name) return 'U';
      return name.split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
    };

    const getPriorityColor = (priority: string) => {
      switch (priority?.toLowerCase()) {
        case 'high': return 'bg-red-100 text-red-800';
        case 'medium': return 'bg-orange-100 text-orange-800';
        case 'low': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <Card key={task.id} className="mb-2 p-3 hover:shadow-md transition-shadow">
        <div className="mb-2 flex justify-between">
          <h4 className="font-medium text-sm">{task.title}</h4>
          {task.priority && (
            <Badge className={`${getPriorityColor(task.priority)}`}>
              {task.priority}
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-2">
          {assignee ? (
            <Avatar className="h-6 w-6">
              <AvatarImage src={assignee.avatar_url || undefined} alt={assignee.full_name || 'User'} />
              <AvatarFallback className="text-xs">
                {getInitials(assignee.full_name)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="h-6 w-6"></div>
          )}
          
          {task.deadline && (
            <span className="text-xs text-muted-foreground">
              {new Date(task.deadline).toLocaleDateString()}
            </span>
          )}
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
          <span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span>
          To Do ({todoTasks.length})
        </h3>
        <div className="bg-gray-50/5 rounded-lg p-2 min-h-[100px]">
          {todoTasks.length > 0 ? (
            todoTasks.map(renderTaskCard)
          ) : (
            <div className="text-center text-sm text-muted-foreground py-4">
              No tasks to do
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
          <span className="h-2 w-2 rounded-full bg-blue-400 mr-2"></span>
          In Progress ({inProgressTasks.length})
        </h3>
        <div className="bg-blue-50/5 rounded-lg p-2 min-h-[100px]">
          {inProgressTasks.length > 0 ? (
            inProgressTasks.map(renderTaskCard)
          ) : (
            <div className="text-center text-sm text-muted-foreground py-4">
              No tasks in progress
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
          <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
          Completed ({completedTasks.length})
        </h3>
        <div className="bg-green-50/5 rounded-lg p-2 min-h-[100px]">
          {completedTasks.length > 0 ? (
            completedTasks.map(renderTaskCard)
          ) : (
            <div className="text-center text-sm text-muted-foreground py-4">
              No completed tasks
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectKanban;
