
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { AccountFormValues } from "@/schemas/accountSchema";

interface AccountNotesFieldProps {
  control: Control<AccountFormValues>;
}

const AccountNotesField: React.FC<AccountNotesFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Notes</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Additional information about this account..."
              className="min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormDescription>
            Any important details or context about this account
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AccountNotesField;
