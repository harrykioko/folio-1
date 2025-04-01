
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase, AuthUser } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userMetadata: AuthUser | null;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null };
  }>;
  signOut: () => Promise<void>;
  loading: boolean;
  setupMFA: () => Promise<{ factorId: string; qrCode: string } | null>;
  verifyMFA: (factorId: string, code: string) => Promise<boolean>;
  checkMFA: () => Promise<boolean>;
  getMFAFactors: () => Promise<any>;
  unenrollMFA: (factorId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userMetadata, setUserMetadata] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Fetch additional user metadata
        if (currentSession?.user) {
          await fetchUserMetadata(currentSession.user.id);
        } else {
          setUserMetadata(null);
        }

        setLoading(false);

        // Redirect based on auth events
        if (event === 'SIGNED_IN') {
          // Stay on current page or redirect to dashboard if on auth pages
          const currentPath = window.location.pathname;
          if (currentPath === '/login' || currentPath === '/signup' || currentPath === '/') {
            navigate('/dashboard');
          }
        } else if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
    );

    // Initial session check
    const initializeAuth = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      setUser(initialSession?.user ?? null);

      if (initialSession?.user) {
        await fetchUserMetadata(initialSession.user.id);
      }

      setLoading(false);
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Fetch user metadata from our custom users table
  const fetchUserMetadata = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user metadata:', error);
        return;
      }

      if (data) {
        setUserMetadata({
          id: data.id,
          email: data.email || '',
          fullName: data.full_name || undefined,
          role: data.role || undefined,
        });
      }
    } catch (error) {
      console.error('Failed to fetch user metadata:', error);
    }
  };

  // Insert or update user metadata in our custom table
  const upsertUserMetadata = async (
    userId: string,
    email: string,
    fullName?: string
  ) => {
    try {
      const { error } = await supabase
        .from('users')
        .upsert(
          {
            id: userId,
            email,
            full_name: fullName || null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );

      if (error) {
        console.error('Error upserting user metadata:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Failed to upsert user metadata:', error);
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
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

  const signUp = async (email: string, password: string, fullName: string) => {
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

  const signOut = async () => {
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

  // Multi-factor authentication methods
  const setupMFA = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "MFA setup failed",
          description: error.message,
        });
        return null;
      }

      return {
        factorId: data.id,
        qrCode: data.totp.qr_code,
      };
    } catch (error) {
      console.error('Error setting up MFA:', error);
      toast({
        variant: "destructive",
        title: "MFA setup failed",
        description: "An unexpected error occurred",
      });
      return null;
    }
  };

  const verifyMFA = async (factorId: string, code: string) => {
    try {
      const { data, error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "MFA verification failed",
          description: error.message,
        });
        return false;
      }

      toast({
        title: "MFA verified",
        description: "Multi-factor authentication has been enabled for your account",
      });
      
      // The response structure has id rather than challenge_id or challenge_verified
      return !!data.id;
    } catch (error) {
      console.error('Error verifying MFA:', error);
      toast({
        variant: "destructive",
        title: "MFA verification failed",
        description: "An unexpected error occurred",
      });
      return false;
    }
  };

  const checkMFA = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      
      if (error) {
        console.error('Error checking MFA status:', error);
        return false;
      }

      return data.nextLevel === 'aal2';
    } catch (error) {
      console.error('Error checking MFA:', error);
      return false;
    }
  };

  const getMFAFactors = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      
      if (error) {
        console.error('Error listing MFA factors:', error);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error getting MFA factors:', error);
      return [];
    }
  };

  const unenrollMFA = async (factorId: string) => {
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "MFA removal failed",
          description: error.message,
        });
        return false;
      }

      toast({
        title: "MFA removed",
        description: "Multi-factor authentication has been disabled for your account",
      });
      return true;
    } catch (error) {
      console.error('Error unenrolling MFA:', error);
      toast({
        variant: "destructive",
        title: "MFA removal failed",
        description: "An unexpected error occurred",
      });
      return false;
    }
  };

  const contextValue: AuthContextType = {
    session,
    user,
    userMetadata,
    signIn,
    signUp,
    signOut,
    loading,
    setupMFA,
    verifyMFA,
    checkMFA,
    getMFAFactors,
    unenrollMFA,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
