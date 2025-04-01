
import { User, Session } from '@supabase/supabase-js';
import { supabase, AuthUser } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { fetchUserMetadata as fetchUserProfile, upsertUserMetadata as upsertUserProfile } from '@/services/userProfileService';

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

  const handleSignUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        });
        return { error, data: { user: null, session: null } };
      }

      // Store the user in our custom table
      if (data.user) {
        await upsertUserMetadata(data.user.id, email, fullName);
      }

      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });

      return { error: null, data };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An unexpected error occurred",
      });
      return { error: error as Error, data: { user: null, session: null } };
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

  return {
    fetchUserMetadata,
    upsertUserMetadata,
    handleSignIn,
    handleSignUp,
    handleSignOut,
  };
};
