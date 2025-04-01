
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Control } from "react-hook-form";
import { AccountFormValues } from "@/schemas/accountSchema";
import { Copy, Eye, EyeOff } from "lucide-react";
import { copyToClipboard } from "@/utils/accountUtils";

interface AccountCredentialsFieldsProps {
  control: Control<AccountFormValues>;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

const AccountCredentialsFields: React.FC<AccountCredentialsFieldsProps> = ({ 
  control, 
  showPassword, 
  togglePasswordVisibility 
}) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        control={control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username / Email</FormLabel>
            <div className="flex items-center space-x-2">
              <FormControl>
                <Input placeholder="username@example.com" {...field} />
              </FormControl>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(field.value, "Username")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <div className="flex items-center space-x-2">
              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...field}
                />
              </FormControl>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(field.value, "Password")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AccountCredentialsFields;
