
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, UserPlus, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const InviteUserForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const { inviteUser, isAdmin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission denied",
        description: "Only administrators can invite users",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const { error } = await inviteUser(email, role);
      
      if (!error) {
        setEmail("");
        setRole("user");
      }
    } catch (err) {
      console.error("Invite error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <UserPlus className="mr-2 h-5 w-5" />
          Invite New User
        </CardTitle>
        <CardDescription>
          Send an invitation to create a new user account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">User Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Users have standard access. Administrators can invite users and manage settings.
            </p>
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !isAdmin}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending invitation...
              </>
            ) : (
              "Send invitation"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        An email will be sent to this address with instructions to set up their account.
      </CardFooter>
    </Card>
  );
};

export default InviteUserForm;
