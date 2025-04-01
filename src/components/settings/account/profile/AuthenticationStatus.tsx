
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

type AuthStatusProps = {
  status: string;
};

const AuthenticationStatus: React.FC<AuthStatusProps> = ({ status }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Authentication status: {status}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Loading your profile or you need to sign in to access this page.</p>
        <Button 
          className="mt-4"
          onClick={() => {
            // Force refresh auth
            supabase.auth.refreshSession();
            window.location.reload();
          }}
        >
          Refresh Session
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthenticationStatus;
