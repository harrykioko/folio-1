
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { InvitationResponse } from '@/types/auth';

/**
 * Core authentication functions for sign in, sign up, and sign out
 */
export const signIn = async (email: string, password: string) => {
  try {
    console.log("Signing in with:", email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
      return { error, data: null };
    }

    console.log("Sign in successful, session:", data.session ? "present" : "missing");
    return { error: null, data: data.session };
  } catch (error) {
    console.error("Unexpected sign in error:", error);
    
    toast({
      variant: "destructive",
      title: "Login failed",
      description: "An unexpected error occurred",
    });
    return { error: error as Error, data: null };
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
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

    toast({
      title: "Account created",
      description: data.session ? "You are now signed in." : "Please check your email to confirm your account.",
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

export const signOut = async () => {
  try {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    toast({
      variant: "destructive",
      title: "Sign out failed",
      description: "An error occurred while signing out",
    });
    return { error };
  }
};

/**
 * Admin functions for user management
 */
export const inviteUser = async (email: string, role: string = 'user') => {
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
