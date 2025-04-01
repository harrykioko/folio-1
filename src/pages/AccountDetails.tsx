
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { AccountFormValues } from "@/schemas/accountSchema";
import { fetchAccountById } from "@/utils/accountUtils";

// Import components
import AccountForm from "@/components/accounts/AccountForm";
import ActivityLog from "@/components/accounts/ActivityLog";
import RelatedResources from "@/components/accounts/RelatedResources";

const AccountDetails: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  const [account, setAccount] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialFormValues, setInitialFormValues] = useState<AccountFormValues | undefined>(undefined);

  // Fetch account data
  useEffect(() => {
    const loadAccountData = () => {
      setLoading(true);
      try {
        if (accountId) {
          const foundAccount = fetchAccountById(accountId);
          
          if (foundAccount) {
            setAccount(foundAccount);
            
            // Set form values
            setInitialFormValues({
              name: foundAccount.name,
              type: foundAccount.type,
              url: foundAccount.url,
              username: foundAccount.username,
              password: foundAccount.password,
              projectId: foundAccount.projectId ? foundAccount.projectId.toString() : "none",
              expiryDate: foundAccount.expiryDate || "",
              notes: foundAccount.notes || "",
              savePassword: true,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching account:", error);
        toast({
          title: "Error",
          description: "Failed to load account details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadAccountData();
  }, [accountId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" className="mr-2" onClick={() => navigate("/accounts")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {accountId ? "Account Details" : "Create New Account"}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Manage the account details and credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccountForm 
              initialData={initialFormValues} 
              accountId={accountId}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <ActivityLog accountId={accountId} />
          <RelatedResources accountId={accountId} account={account} />
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
