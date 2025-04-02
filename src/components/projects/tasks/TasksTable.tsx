
import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/utils/tasks/types";
import { formatTaskStatus } from "@/utils/tasks";
import { User } from "@/hooks/useUsers";

interface TasksTableProps {
  tasks: Task[];
  users: User[] | null;
  isLoadingUsers: boolean;
}

const TasksTable: React.FC<TasksTableProps> = ({ tasks, users, isLoadingUsers }) => {
  const navigate = useNavigate();
  
  const getUserName = (userId: string | null) => {
    if (!userId) return "Unassigned";
    if (isLoadingUsers) return "Loading...";
    
    const user = users?.find(user => user.id === userId);
    return user?.full_name || user?.email || "Unknown User";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-blue-500";
      case "low": return "bg-green-500";
      default: return "bg-slate-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in_progress": 
      case "in progress": return "bg-blue-500";
      case "todo": 
      case "to do": return "bg-slate-500";
      case "done": 
      case "completed": return "bg-green-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Due Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow 
            key={task.id} 
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => navigate(`/tasks/${task.id}`)}
          >
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(task.status)}>
                {formatTaskStatus(task.status)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>{getUserName(task.assigned_to)}</TableCell>
            <TableCell>
              {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No due date"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TasksTable;
