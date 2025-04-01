
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase, AuthUser } from '@/lib/supabase';
import { useAuthHooks } from '@/hooks/useAuthHooks';
import { AuthContextType } from '@/types/auth';

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userMetadata, setUserMetadata] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Use our custom hook for auth functionality
  const { 
    fetchUserMetadata, 
    handleSignIn, 
    handleSignUp, 
    handleSignOut,
    handleSetupMFA,
    handleVerifyMFA,
    handleCheckMFA,
    handleGetMFAFactors,
    handleUnenrollMFA
  } = useAuthHooks(setUserMetadata);

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
  }, [navigate, fetchUserMetadata]);

  // Provide the auth context value
  const contextValue: AuthContextType = {
    session,
    user,
    userMetadata,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    loading,
    setupMFA: handleSetupMFA,
    verifyMFA: handleVerifyMFA,
    checkMFA: handleCheckMFA,
    getMFAFactors: handleGetMFAFactors,
    unenrollMFA: handleUnenrollMFA,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
