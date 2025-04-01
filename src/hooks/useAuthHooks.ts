
import { User, Session } from '@supabase/supabase-js';
import { supabase, AuthUser } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { fetchUserMetadata as fetchUserProfile, upsertUserMetadata as upsertUserProfile } from '@/services/userProfileService';
import { InvitationResponse } from '@/types/auth';

export const useAuthHooks = (setUserMetadata: React.Dispatch<React.SetStateAction<AuthUser | null>>) => {
  // Fetch user metadata from our custom users table
  const fetchUserMetadata = async (userId: string) => {
    const userData = await fetchUserProfile(userId);
    if (userData) {
      setUserMetadata(userData);
    }
  };

  // Insert or update user metadata in our custom table
  const upsertUserMetadata = async (
    userId: string,
    email: string,
    fullName?: string
  ) => {
    return await upsertUserProfile(userId, email, fullName);
  };

  // Authentication methods
  const handleSignIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
        return { error, data: null };
      }

      // Success message handled by onAuthStateChange
      return { error: null, data: data.session };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred",
      });
      return { error: error as Error, data: null };
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: "An error occurred while signing out",
      });
    }
  };

  // Invite a new user (admin only)
  const handleInviteUser = async (email: string, role: string = 'user') => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        toast({
          variant: "destructive",
          title: "Authentication error",
          description: "You must be logged in to invite users",
        });
        return { error: new Error("Authentication error"), data: null };
      }

      const response = await supabase.functions.invoke("invite-user", {
        body: { email, role },
      });

      if (response.error) {
        toast({
          variant: "destructive",
          title: "Invitation failed",
          description: response.error.message || "Could not invite user",
        });
        return { error: new Error(response.error.message), data: null };
      }

      const result = response.data as InvitationResponse;
      
      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Invitation failed",
          description: result.error || "Could not invite user",
        });
        return { error: new Error(result.error || "Invitation failed"), data: null };
      }

      toast({
        title: "User invited",
        description: `${email} has been invited successfully`,
      });

      return { error: null, data: result };
    } catch (error) {
      console.error('Error inviting user:', error);
      toast({
        variant: "destructive",
        title: "Invitation failed",
        description: "An unexpected error occurred",
      });
      return { error: error as Error, data: null };
    }
  };

  return {
    fetchUserMetadata,
    upsertUserMetadata,
    handleSignIn,
    handleSignOut,
    handleInviteUser,
  };
};
