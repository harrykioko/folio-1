
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export function useUser() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  
  return {
    user: context.user,
    userMetadata: context.userMetadata,
    isAdmin: context.isAdmin,
    loading: context.loading,
    isAuthenticated: !!context.user
  };
}
