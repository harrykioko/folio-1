
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { TaskFormSchema, TaskFormValues } from "./form/TaskFormSchema";
import { 
  TitleField,
  DescriptionField,
  StatusField,
  PriorityField,
  ProjectField,
  AssigneeField,
  DueDateField 
} from "./form/fields";
import FormActions from "./form/FormActions";
import { useProjects } from "@/hooks/useProjects";
import { useUsers } from "@/hooks/useUsers";

interface TaskFormProps {
  task?: any;
  defaultProjectId?: string;
  onSubmit: (data: TaskFormValues) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  task, 
  defaultProjectId,
  onSubmit, 
  onCancel 
}) => {
  // Fetch projects and users data
  const { projects, isLoading: projectsLoading } = useProjects();
  const { users, isLoading: usersLoading } = useUsers();
  
  // Set up form with default values from task if editing, or use defaultProjectId if provided
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "To Do",
      priority: task?.priority || "Medium",
      projectId: task?.projectId || defaultProjectId || "",
      assignee: task?.assignee || "unassigned",
      dueDate: task?.dueDate || "",
    },
  });

  const handleSubmit = (data: TaskFormValues) => {
    // Convert "unassigned" value to null for the assignee field
    const formattedData = {
      ...data,
      assignee: data.assignee === "unassigned" ? null : data.assignee
    };
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <TitleField form={form} />
        <DescriptionField form={form} />

        <div className="grid gap-6 md:grid-cols-2">
          <StatusField form={form} />
          <PriorityField form={form} />
          <ProjectField 
            form={form} 
            projects={projects || []} 
            isLoading={projectsLoading} 
          />
          <AssigneeField 
            form={form} 
            users={users || []} 
            isLoading={usersLoading} 
          />
          <DueDateField form={form} />
        </div>

        <FormActions 
          isEditing={!!task} 
          onCancel={onCancel} 
        />
      </form>
    </Form>
  );
};

export default TaskForm;
