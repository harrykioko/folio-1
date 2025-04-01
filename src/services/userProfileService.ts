
import { supabase, AuthUser } from '@/lib/supabase';

export const fetchUserMetadata = async (userId: string): Promise<AuthUser | null> => {
  try {
    console.log("Fetching user metadata for ID:", userId);
    
    // Use a prepared statement with a single value lookup for better performance
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user metadata:', error);
      return null;
    }

    if (data) {
      console.log("Raw user data retrieved from database:", data);
      
      return {
        id: data.id,
        email: data.email || '',
        fullName: data.full_name || undefined,
        role: data.role || undefined,
        bio: data.bio || undefined,
        avatarUrl: data.avatar_url || undefined,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch user metadata:', error);
    return null;
  }
};

export const upsertUserMetadata = async (
  userId: string,
  email: string,
  fullName?: string,
  bio?: string,
  avatarUrl?: string
): Promise<boolean> => {
  try {
    console.log("Upserting user metadata:", {
      userId,
      email,
      fullName,
      bio,
      avatarUrl
    });
    
    const { error } = await supabase
      .from('users')
      .upsert(
        {
          id: userId,
          email,
          full_name: fullName || null,
          bio: bio || null,
          avatar_url: avatarUrl || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (error) {
      console.error('Error upserting user metadata:', error);
      return false;
    }
    
    console.log('User metadata updated successfully');
    return true;
  } catch (error) {
    console.error('Failed to upsert user metadata:', error);
    return false;
  }
};
