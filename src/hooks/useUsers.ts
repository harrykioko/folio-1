
import { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";

export type User = {
  id: string;
  full_name: string | null;
  email: string | null;
}

/**
 * Hook for fetching and managing users data
 * @returns Users data with loading and error states
 */
export function useUsers() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching users from Supabase');
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email')
        .order('full_name', { ascending: true });
      
      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
      
      console.log(`Successfully fetched ${data?.length || 0} users`);
      setUsers(data as User[]);
    } catch (err) {
      console.error('Error loading users:', err);
      setError(err instanceof Error ? err : new Error('Failed to load users'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    error,
    refreshUsers: fetchUsers
  };
}
