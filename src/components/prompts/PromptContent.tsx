
import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { PromptFormValues } from "./promptFormSchema";
import TagInput from "./TagInput";

interface PromptContentProps {
  form: UseFormReturn<PromptFormValues>;
}

const PromptContent: React.FC<PromptContentProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="prompt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prompt Content</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Write your prompt here with placeholders for variables like [TOPIC] or [KEYWORDS]"
                className="min-h-[250px] font-mono text-sm"
                {...field}
              />
            </FormControl>
            <FormDescription>
              The actual prompt content with placeholders in [BRACKETS] for customizable variables
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <TagInput form={form} />
    </div>
  );
};

export default PromptContent;
