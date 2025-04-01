
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { AccountFormValues } from "@/schemas/accountSchema";
import { accountTypes } from "@/utils/accountUtils";
import { Globe, Github, Twitter, Instagram, Linkedin, AtSign, Bookmark } from "lucide-react";

interface AccountTypeSelectorProps {
  control: Control<AccountFormValues>;
}

const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({ control }) => {
  // Function to get icon based on account type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'domain':
        return <Globe className="h-5 w-5" />;
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'service':
        return <AtSign className="h-5 w-5" />;
      default:
        return <Bookmark className="h-5 w-5" />;
    }
  };

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
