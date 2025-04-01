
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { AccountFormValues } from "@/schemas/accountSchema";
import { accountTypes } from "@/utils/accountTypes";
import { getTypeIcon } from "@/utils/accountIcons";

interface AccountTypeSelectorProps {
  control: Control<AccountFormValues>;
}

const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Account Type</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {accountTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  <div className="flex items-center">
                    {getTypeIcon(type.id)}
                    <span className="ml-2">{type.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AccountTypeSelector;
