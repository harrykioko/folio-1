
import { AuthUser } from '@/lib/supabase';
import { fetchUserMetadata as fetchUserProfile, upsertUserMetadata as upsertUserProfile } from '@/services/userProfileService';
import { signIn, signUp, signOut, inviteUser } from '@/services/authService';

export const useAuthHooks = (setUserMetadata: React.Dispatch<React.SetStateAction<AuthUser | null>>) => {
  // Fetch user metadata from our custom users table
  const fetchUserMetadata = async (userId: string) => {
    try {
      const userData = await fetchUserProfile(userId);
      if (userData) {
        setUserMetadata(userData);
        return userData;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user metadata:", error);
      return null;
    }
  };

  // Insert or update user metadata in our custom table
  const upsertUserMetadata = async (
    userId: string,
    email: string,
    fullName?: string
  ) => {
    try {
      return await upsertUserProfile(userId, email, fullName);
    } catch (error) {
      console.error("Error upserting user metadata:", error);
      return null;
    }
  };

  // Expose the authentication methods from our service
  const handleSignIn = async (email: string, password: string) => {
    return await signIn(email, password);
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    const { error, data } = await signUp(email, password, name);
    
    // If user is created successfully, add to our users table
    if (!error && data.user) {
      await upsertUserMetadata(data.user.id, email, name);
    }
    
    return { error, data };
  };

  const handleSignOut = async () => {
    return await signOut();
  };

  const handleInviteUser = async (email: string, role: string = 'user') => {
    return await inviteUser(email, role);
  };

  return {
    fetchUserMetadata,
    upsertUserMetadata,
    handleSignIn,
    handleSignOut,
    handleSignUp,
    handleInviteUser,
  };
};
