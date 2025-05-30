
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [delayedLoading, setDelayedLoading] = useState(true);
  
  // Add a short timeout to prevent flash of loading state for quick checks
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedLoading(loading);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [loading]);

  // Log auth state for debugging
  useEffect(() => {
    console.log(`RequireAuth: loading=${loading}, authenticated=${!!user}, path=${location.pathname}`);
  }, [loading, user, location.pathname]);

  // Only show loading if it persists longer than the timeout
  if (delayedLoading && loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <div className="text-muted-foreground">
          Loading your session...
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("No user found, redirecting to login from", location.pathname);
    // Redirect to login page with the return path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
