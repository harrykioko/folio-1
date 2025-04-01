
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InviteUserForm from "@/components/admin/InviteUserForm";
import { Navigate } from "react-router-dom";
import { PageHeader } from "@/components/ui/page-header";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const UserManagement: React.FC = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Only admins can access this page
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container py-8 max-w-6xl">
      <PageHeader
        heading="User Management"
        description="Manage users and invitations for your organization"
      />

      <Alert className="my-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Folio uses an invite-only registration system. New users can only join when invited by an administrator.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="invite" className="mt-6">
        <TabsList>
          <TabsTrigger value="invite">Invite Users</TabsTrigger>
          <TabsTrigger value="pending">Pending Invitations</TabsTrigger>
          <TabsTrigger value="existing">Manage Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="invite" className="mt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-2">Send New Invitation</h3>
              <p className="text-muted-foreground mb-4">
                Invite new team members to join your Folio workspace. They'll receive an email with instructions to set up their account.
              </p>
            </div>
            <InviteUserForm />
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <div className="bg-muted/40 rounded-lg p-12 text-center">
            <h3 className="text-lg font-medium mb-2">Pending Invitations List</h3>
            <p className="text-muted-foreground">
              This section will show all pending invitations. Coming soon.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="existing" className="mt-6">
          <div className="bg-muted/40 rounded-lg p-12 text-center">
            <h3 className="text-lg font-medium mb-2">Existing Users List</h3>
            <p className="text-muted-foreground">
              This section will allow you to manage existing users. Coming soon.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
