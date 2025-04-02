
import { useState, useEffect } from 'react';
import { Account } from '@/utils/accountTypes';
import { 
  fetchAllAccounts, 
  showErrorToast 
} from '@/utils/accountHelpers';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const accountsData = await fetchAllAccounts();
      setAccounts(accountsData);
    } catch (err) {
      console.error('Error in useAccounts hook:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch accounts'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    isLoading,
    error,
    refreshAccounts: fetchAccounts,
  };
}
