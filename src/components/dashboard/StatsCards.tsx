
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckSquare, FolderClosed, Lightbulb, UserCircle } from "lucide-react";

interface StatsCardsProps {
  projectCount: number;
  taskCount: number;
  accountCount: number;
  promptCount: number;
  projectsLoading: boolean;
  tasksLoading: boolean;
  accountsLoading: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  projectCount,
  taskCount,
  accountCount,
  promptCount,
  projectsLoading,
  tasksLoading,
  accountsLoading,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Projects</CardTitle>
          <FolderClosed className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projectsLoading ? "..." : projectCount}</div>
          <p className="text-xs text-muted-foreground">
            +2 from last month
          </p>
        </CardContent>
        <CardFooter className="p-2">
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <Link to="/projects">View All Projects</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasks</CardTitle>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tasksLoading ? "..." : taskCount}</div>
          <p className="text-xs text-muted-foreground">
            8 due this week
          </p>
        </CardContent>
        <CardFooter className="p-2">
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <Link to="/tasks">View All Tasks</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accounts</CardTitle>
          <UserCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{accountsLoading ? "..." : accountCount}</div>
          <p className="text-xs text-muted-foreground">
            +1 this month
          </p>
        </CardContent>
        <CardFooter className="p-2">
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <Link to="/accounts">View All Accounts</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prompts</CardTitle>
          <Lightbulb className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{promptCount}</div>
          <p className="text-xs text-muted-foreground">
            +26 this month
          </p>
        </CardContent>
        <CardFooter className="p-2">
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <Link to="/prompts">View All Prompts</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StatsCards;
