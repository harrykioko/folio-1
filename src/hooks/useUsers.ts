
import { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type User = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
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
      
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email, avatar_url')
        .order('full_name', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      setUsers(data as User[]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load users'));
      toast.error("Failed to load users. Please try again later.");
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
