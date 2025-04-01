
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase, AuthUser } from '@/lib/supabase';
import { useAuthHooks } from '@/hooks/useAuthHooks';
import { AuthContextType } from '@/types/auth';
import { useMFA } from '@/hooks/useMFA';
import { toast } from '@/hooks/use-toast';

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userMetadata, setUserMetadata] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use our custom hook for auth functionality
  const { 
    fetchUserMetadata, 
    handleSignIn, 
    handleSignOut,
    handleSignUp,
    handleInviteUser
  } = useAuthHooks(setUserMetadata);

  // Use MFA hooks
  const {
    setupMFA,
    verifyMFA,
    checkMFA,
    getMFAFactors,
    unenrollMFA
  } = useMFA();

  // Optimized metadata fetch with retry logic
  const fetchMetadataWithRetry = async (userId: string, retries = 2, delay = 300) => {
    let attempts = 0;
    
    const fetchWithBackoff = async (): Promise<AuthUser | null> => {
      try {
        attempts++;
        const metadata = await fetchUserMetadata(userId);
        
        if (metadata) {
          return metadata;
        }
        
        if (attempts >= retries) {
          console.warn(`Failed to fetch user metadata after ${retries} attempts`);
          return null;
        }
        
        await new Promise(resolve => setTimeout(resolve, delay * attempts));
        return fetchWithBackoff();
      } catch (error) {
        console.error("Error in fetchMetadataWithRetry:", error);
        
        if (attempts >= retries) {
          return null;
        }
        
        await new Promise(resolve => setTimeout(resolve, delay * attempts));
        return fetchWithBackoff();
      }
    };
    
    return fetchWithBackoff();
  };

  // Handle auth state changes
  useEffect(() => {
    console.log("Setting up auth state listener");
    let isSubscribed = true;
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log(`Auth event: ${event}, user: ${currentSession?.user?.email || 'none'}`);
        
        if (!isSubscribed) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Handle different auth events
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (currentSession?.user) {
            try {
              // Fetch metadata immediately but don't block rendering
              const metadata = await fetchMetadataWithRetry(currentSession.user.id);
              
              if (!metadata && event === 'SIGNED_IN') {
                // If we can't get metadata after a fresh login, something is wrong
                toast({
                  variant: "destructive",
                  title: "Account setup incomplete",
                  description: "Unable to fetch your account details. Please try again later."
                });
              }
            } catch (error) {
              console.error("Error fetching user metadata:", error);
            } finally {
              setLoading(false);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUserMetadata(null);
          setIsAdmin(false);
          setLoading(false);
        }

        // Only redirect based on auth events after initialization
        if (authInitialized) {
          if (event === 'SIGNED_IN') {
            // Stay on current page or redirect to dashboard if on auth pages
            const authPaths = ['/login', '/signup', '/'];
            if (authPaths.includes(location.pathname)) {
              navigate('/dashboard', { replace: true });
            }
          } else if (event === 'SIGNED_OUT') {
            navigate('/login', { replace: true });
          }
        }
      }
    );

    // Initial session check
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth state");
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (!isSubscribed) return;
        
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        if (initialSession?.user) {
          try {
            await fetchMetadataWithRetry(initialSession.user.id);
          } catch (error) {
            console.error("Error fetching initial user metadata:", error);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        if (isSubscribed) {
          setLoading(false);
          setAuthInitialized(true);
          console.log("Auth initialized");
        }
      }
    };

    initializeAuth();

    return () => {
      isSubscribed = false;
      subscription.unsubscribe();
    };
  }, [navigate, fetchUserMetadata, location.pathname]);

  // Update isAdmin state when userMetadata changes
  useEffect(() => {
    if (userMetadata?.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userMetadata]);

  // Provide the auth context value
  const contextValue: AuthContextType = {
    session,
    user,
    userMetadata,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    loading,
    isAdmin,
    inviteUser: handleInviteUser,
    setupMFA,
    verifyMFA,
    getMFAFactors,
    unenrollMFA,
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
