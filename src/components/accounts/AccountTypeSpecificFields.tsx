
import React from "react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AccountFormValues } from "@/schemas/accountSchema";
import { socialPlatforms } from "@/utils/accountTypes";

interface AccountTypeSpecificFieldsProps {
  control: Control<AccountFormValues>;
  accountType: string;
}

const AccountTypeSpecificFields: React.FC<AccountTypeSpecificFieldsProps> = ({ 
  control, 
  accountType 
}) => {
  if (accountType === "SocialMedia") {
    return (
      <FormField
        control={control}
        name="platform"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Platform <span className="text-red-500">*</span></FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value || undefined}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {socialPlatforms.map(platform => (
                  <SelectItem key={platform.id} value={platform.id}>
                    {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (accountType === "Domain") {
    return (
      <>
        <FormField
          control={control}
          name="hostedOn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hosted On</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} placeholder="e.g., Namecheap, GoDaddy" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="renewalCost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Renewal Cost</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                  <Input 
                    {...field} 
                    type="number" 
                    className="pl-7" 
                    value={field.value === null ? '' : field.value}
                    onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                    placeholder="0.00" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  if (accountType === "Service") {
    return (
      <FormField
        control={control}
        name="monthlyCost"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Cost</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                <Input 
                  {...field} 
                  type="number" 
                  className="pl-7" 
                  value={field.value === null ? '' : field.value}
                  onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="0.00" 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return null;
};

export default AccountTypeSpecificFields;
