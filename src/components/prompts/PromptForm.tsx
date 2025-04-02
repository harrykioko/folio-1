
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Save, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { promptFormSchema, PromptFormValues } from "./promptFormSchema";
import PromptDetails from "./PromptDetails";
import PromptContent from "./PromptContent";

interface PromptFormProps {
  defaultValues?: Partial<PromptFormValues>;
  onSubmit: (values: PromptFormValues) => void;
  isEditing?: boolean;
  isSubmitting?: boolean;
  projects?: { id: string; name: string }[];
  initialProjectId?: string | null;
}

const PromptForm: React.FC<PromptFormProps> = ({
  defaultValues,
  onSubmit,
  isEditing = false,
  isSubmitting = false,
  projects = [],
  initialProjectId = null,
}) => {
  const form = useForm<PromptFormValues>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      prompt: "",
      effectiveness: "Medium",
      projectId: initialProjectId || "",
      tags: [],
      ...defaultValues,
    },
  });

  const handleFormSubmit = (values: PromptFormValues) => {
    try {
      onSubmit(values);
      toast({
        title: isEditing ? "Prompt updated" : "Prompt created",
        description: isEditing
          ? "Your prompt has been updated successfully"
          : "Your prompt has been created successfully",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was an error saving your prompt. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PromptDetails form={form} projects={projects} />
          <PromptContent form={form} />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" className="gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {isEditing ? "Update Prompt" : "Create Prompt"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PromptForm;
