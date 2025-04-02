
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Account } from '@/utils/accountTypes';
import { toast } from '@/hooks/use-toast';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('account_details')
        .select('*');

      if (error) {
        throw error;
      }

      // Transform the data to match our Account type
      const formattedAccounts: Account[] = data.map((account) => ({
        id: account.id,
        name: account.name || 'Unnamed Account',
        type: account.type || 'Domain',
        url: account.url || '',
        username: account.username || '',
        password: account.password ? 'password123' : '', // Using dummy password as real passwords are stored encrypted
        notes: '',
        expiryDate: account.renewal_date,
        projectId: account.project_id ? account.project_id.toString() : undefined,
        platform: account.social_platform,
        hostedOn: account.hosted_on,
        renewalCost: account.renewal_cost,
        monthlyCost: account.monthly_cost,
      }));

      setAccounts(formattedAccounts);
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch accounts'));
      
      toast({
        title: 'Error fetching accounts',
        description: 'There was a problem loading your accounts. Please try again.',
        variant: 'destructive',
      });
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
