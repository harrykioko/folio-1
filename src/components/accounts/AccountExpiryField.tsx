
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { AccountFormValues } from "@/schemas/accountSchema";
import { Clock } from "lucide-react";

interface AccountExpiryFieldProps {
  control: Control<AccountFormValues>;
}

const AccountExpiryField: React.FC<AccountExpiryFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="expiryDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Expiry Date</FormLabel>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
          </div>
          <FormDescription>
            When this account or subscription needs to be renewed
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AccountExpiryField;
