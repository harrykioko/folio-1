
import React, { createContext, useContext } from 'react';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useAuthHooks } from '@/hooks/useAuthHooks';
import { AuthContextType } from '@/types/auth';
import { useMFA } from '@/hooks/useMFA';

// Create the context with undefined as initial value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use our custom hook for auth functionality
  const { 
    fetchUserMetadata, 
    handleSignIn, 
    handleSignOut,
    handleSignUp,
    handleInviteUser
  } = useAuthHooks(setUserMetadata => setUserMetadata);

  // Use auth session management hook
  const {
    session,
    user,
    userMetadata,
    loading,
    isAdmin,
    setUserMetadata
  } = useAuthSession(fetchUserMetadata);

  // Use MFA hooks
  const {
    setupMFA,
    verifyMFA,
    checkMFA,
    getMFAFactors,
    unenrollMFA
  } = useMFA();

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
