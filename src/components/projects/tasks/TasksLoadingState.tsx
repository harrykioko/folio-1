
import React from "react";
import { CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const TasksLoadingState: React.FC = () => {
  return (
    <CardContent>
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </CardContent>
  );
};

export default TasksLoadingState;
