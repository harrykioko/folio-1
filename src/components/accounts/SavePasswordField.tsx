
import React from "react";
import { FormField, FormItem, FormControl, FormLabel, FormDescription } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { AccountFormValues } from "@/schemas/accountSchema";

interface SavePasswordFieldProps {
  control: Control<AccountFormValues>;
}

const SavePasswordField: React.FC<SavePasswordFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="savePassword"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Save Password</FormLabel>
            <FormDescription>
              Store password securely in the vault. Passwords are encrypted at rest.
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};

export default SavePasswordField;
