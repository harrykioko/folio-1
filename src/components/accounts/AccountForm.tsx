
import React, { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountFormValues, accountFormSchema } from "@/schemas/accountSchema";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Trash2, Save } from "lucide-react";
import { handleDeleteAccount } from "@/utils/accountActions";

// Import form components
import AccountBasicFields from "./AccountBasicFields";
import AccountTypeSelector from "./AccountTypeSelector";
import AccountTypeSpecificFields from "./AccountTypeSpecificFields";
import AccountCredentialsFields from "./AccountCredentialsFields";
import SavePasswordField from "./SavePasswordField";
import AccountProjectField from "./AccountProjectField";
import AccountExpiryField from "./AccountExpiryField";
import AccountNotesField from "./AccountNotesField";

interface AccountFormProps {
  initialData?: AccountFormValues;
  accountId?: string;
}

const AccountForm: React.FC<AccountFormProps> = ({ initialData, accountId }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  // Initialize form with default values or provided data
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: initialData || {
      name: "",
      type: "",
      platform: null,
      url: "",
      username: "",
      password: "",
      projectId: "",
      expiryDate: "",
      notes: "",
      savePassword: true,
      hostedOn: null,
      renewalCost: null,
      monthlyCost: null,
    },
  });

  // Watch the account type to show/hide conditional fields
  const accountType = form.watch("type");

  // Reset type-specific fields when account type changes
  useEffect(() => {
    if (accountType) {
      if (accountType !== "SocialMedia") {
        form.setValue("platform", null);
      }
      if (accountType !== "Domain") {
        form.setValue("hostedOn", null);
        form.setValue("renewalCost", null);
      }
      if (accountType !== "Service") {
        form.setValue("monthlyCost", null);
      }
    }
  }, [accountType, form]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Form submission handler
  const onSubmit = (data: AccountFormValues) => {
    console.log("Form submitted:", data);
    
    // In a real app, you would send this to an API
    toast({
      title: "Success",
      description: `Account ${accountId ? "updated" : "created"} successfully`,
    });
    
    // Navigate back to accounts list
    navigate("/accounts");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <AccountBasicFields control={form.control} />
          <AccountTypeSelector control={form.control} />
        </div>

        {/* Type-specific fields */}
        {accountType && (
          <div className="grid gap-4 sm:grid-cols-2">
            <AccountTypeSpecificFields control={form.control} accountType={accountType} />
          </div>
        )}

        <AccountCredentialsFields 
          control={form.control} 
          showPassword={showPassword} 
          togglePasswordVisibility={togglePasswordVisibility} 
        />

        <SavePasswordField control={form.control} />
        <AccountProjectField control={form.control} />
        <AccountExpiryField control={form.control} />
        <AccountNotesField control={form.control} />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="destructive"
            onClick={() => accountId && handleDeleteAccount(accountId, navigate)}
            className={accountId ? "" : "invisible"}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
          
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            {accountId ? "Update Account" : "Create Account"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountForm;
