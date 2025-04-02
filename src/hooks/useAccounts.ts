
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
      
      // Check authentication status first
      const { data: authData } = await supabase.auth.getSession();
      if (!authData.session) {
        console.warn("User not authenticated. Some features may not work properly.");
      }
      
      console.log("Fetching accounts from view...");
      const { data: viewData, error: viewError } = await supabase
        .from('account_details')
        .select('*');

      if (viewError) {
        console.error("Error fetching from view:", viewError);
        
        // Fall back to direct query if view fails
        console.log("Falling back to direct query...");
        const { data: directData, error: directError } = await supabase
          .from('accounts')
          .select('*');
          
        if (directError) {
          throw directError;
        }
        
        if (directData) {
          console.log("Direct query succeeded, accounts:", directData.length);
          const formattedAccounts: Account[] = directData.map((account) => ({
            id: account.id || '',
            name: account.name || 'Unnamed Account',
            type: account.type || 'Domain',
            url: account.url || '',
            username: account.username || '',
            password: account.password ? 'password123' : '', 
            notes: '',
            expiryDate: account.renewal_date,
            projectId: account.project_id ? account.project_id.toString() : undefined,
            projectName: '',
          }));
          
          // Fetch project names for accounts with project IDs
          await enrichWithProjectNames(formattedAccounts);
          
          setAccounts(formattedAccounts);
          return;
        }
      }

      if (viewData) {
        console.log("View query succeeded, accounts:", viewData.length);
        // Transform the data to match our Account type
        const formattedAccounts: Account[] = viewData.map((account) => ({
          id: account.id || '',
          name: account.name || 'Unnamed Account',
          type: account.type || 'Domain',
          url: account.url || '',
          username: account.username || '',
          password: account.password ? 'password123' : '', 
          notes: '',
          expiryDate: account.renewal_date,
          projectId: account.project_id ? account.project_id.toString() : undefined,
          projectName: '', // Will be filled below
          platform: account.social_platform,
          hostedOn: account.hosted_on,
          renewalCost: account.renewal_cost,
          monthlyCost: account.monthly_cost,
          followers: account.followers,
          impressions: account.impressions,
        }));
        
        // Fetch project names for accounts with project IDs
        await enrichWithProjectNames(formattedAccounts);

        setAccounts(formattedAccounts);
      }
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

  // Helper function to fetch project names
  const enrichWithProjectNames = async (accounts: Account[]) => {
    const accountsWithProjects = accounts.filter(account => account.projectId);
    
    if (accountsWithProjects.length === 0) return;
    
    // Get unique project IDs to minimize API calls
    const uniqueProjectIds = [...new Set(accountsWithProjects.map(a => a.projectId))];
    
    try {
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('id, name')
        .in('id', uniqueProjectIds.map(id => parseInt(id as string, 10)));
        
      if (projectsError) {
        console.error("Error fetching project names:", projectsError);
        return;
      }
      
      if (projectsData) {
        const projectMap = new Map(projectsData.map(p => [p.id.toString(), p.name]));
        
        // Update accounts with project names
        accounts.forEach(account => {
          if (account.projectId && projectMap.has(account.projectId)) {
            account.projectName = projectMap.get(account.projectId) || '';
          }
        });
      }
    } catch (error) {
      console.error("Error enriching accounts with project names:", error);
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
