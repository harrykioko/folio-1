
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { AccountFormValues } from "@/schemas/accountSchema";
import { useUsers } from "@/hooks/useUsers";
import { Loader2 } from "lucide-react";

interface AccountOwnerFieldProps {
  control: Control<AccountFormValues>;
}

const AccountOwnerField: React.FC<AccountOwnerFieldProps> = ({ control }) => {
  const { users, isLoading, error } = useUsers();

  return (
    <FormField
      control={control}
      name="ownerId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Account Owner</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || ""}
          >
            <FormControl>
              <SelectTrigger>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading users...</span>
                  </div>
                ) : (
                  <SelectValue placeholder="Select an owner (optional)" />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {users && users.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.full_name || user.email}
                </SelectItem>
              ))}
              {error && <SelectItem value="error" disabled>Error loading users</SelectItem>}
            </SelectContent>
          </Select>
          <FormDescription>
            Assign this account to a specific user
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AccountOwnerField;
