
import React from "react";

interface NewTaskHeaderProps {
  linkedProject?: {
    name: string;
  } | null;
}

const NewTaskHeader: React.FC<NewTaskHeaderProps> = ({ linkedProject }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">Create New Task</h1>
      {linkedProject && (
        <p className="text-muted-foreground mt-2">
          Creating task for project: <span className="font-medium">{linkedProject.name}</span>
        </p>
      )}
      <p className="text-muted-foreground mt-2">
        Fill out the form below to create a new task.
      </p>
    </div>
  );
};

export default NewTaskHeader;
