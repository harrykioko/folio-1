
import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

const TasksErrorState: React.FC = () => {
  return (
    <CardContent>
      <div className="text-center py-10 text-destructive">
        <p>Failed to load tasks. Please try again later.</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    </CardContent>
  );
};

export default TasksErrorState;
