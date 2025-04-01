
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, AuthUser } from '@/lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

type FetchMetadataFn = (userId: string) => Promise<AuthUser | null>;

export const useAuthSession = (fetchUserMetadata: FetchMetadataFn) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userMetadata, setUserMetadata] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
              // Use setTimeout to prevent potential deadlocks with Supabase auth
              setTimeout(async () => {
                if (!isSubscribed) return;
                
                const metadata = await fetchMetadataWithRetry(currentSession.user.id);
                console.log("Fetched user metadata:", metadata);
                
                if (isSubscribed) {
                  setUserMetadata(metadata);
                  setLoading(false);
                }
                
                if (!metadata && event === 'SIGNED_IN' && isSubscribed) {
                  // If we can't get metadata after a fresh login, something is wrong
                  toast({
                    variant: "destructive",
                    title: "Account setup incomplete",
                    description: "Unable to fetch your account details. Please try again later."
                  });
                }
              }, 0);
            } catch (error) {
              console.error("Error fetching user metadata:", error);
              if (isSubscribed) {
                setLoading(false);
              }
            }
          } else {
            if (isSubscribed) {
              setLoading(false);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          if (isSubscribed) {
            setUserMetadata(null);
            setIsAdmin(false);
            setLoading(false);
          }
        } else {
          // For other events, ensure loading state is updated
          if (isSubscribed) {
            setLoading(false);
          }
        }

        // Only redirect based on auth events after initialization
        if (authInitialized && isSubscribed) {
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
            const metadata = await fetchMetadataWithRetry(initialSession.user.id);
            if (isSubscribed) {
              setUserMetadata(metadata);
            }
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

  return {
    session,
    user,
    userMetadata,
    loading,
    isAdmin,
    authInitialized,
    setUserMetadata
  };
};
