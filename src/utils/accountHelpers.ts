
import { supabase } from '@/integrations/supabase/client';
import { Account } from '@/utils/accountTypes';
import { toast } from '@/hooks/use-toast';

/**
 * Fetches account data from the account_details view
 */
export async function fetchAccountDetailsFromView() {
  console.log("Fetching accounts from view...");
  const { data, error } = await supabase
    .from('account_details')
    .select('*');
    
  if (error) {
    console.error("Error fetching from view:", error);
    throw error;
  }
  
  return data;
}

/**
 * Fallback function to fetch accounts directly when the view fails
 */
export async function fetchAccountsDirectly() {
  console.log("Falling back to direct query...");
  const { data, error } = await supabase
    .from('accounts')
    .select('*');
    
  if (error) {
    console.error("Error in direct query:", error);
    throw error;
  }
  
  return data;
}

/**
 * Transforms raw account data from Supabase into our Account model
 */
export function transformAccountData(accountData: any[]): Account[] {
  return accountData.map((account) => ({
    id: account.id || '',
    name: account.name || 'Unnamed Account',
    type: account.type || 'Domain',
    url: account.url || '',
    username: account.username || '',
    password: account.password ? 'password123' : '', 
    notes: '',
    expiryDate: account.renewal_date,
    projectId: account.project_id ? account.project_id.toString() : undefined,
    projectName: '', // Will be filled by enrichWithProjectNames
    platform: account.social_platform,
    hostedOn: account.hosted_on,
    renewalCost: account.renewal_cost,
    monthlyCost: account.monthly_cost,
    followers: account.followers,
    impressions: account.impressions,
  }));
}

/**
 * Fetches project names for accounts with project IDs and updates the accounts with the names
 */
export async function enrichWithProjectNames(accounts: Account[]): Promise<Account[]> {
  const accountsWithProjects = accounts.filter(account => account.projectId);
  
  if (accountsWithProjects.length === 0) return accounts;
  
  // Get unique project IDs to minimize API calls
  const uniqueProjectIds = [...new Set(accountsWithProjects.map(a => a.projectId))];
  
  try {
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .select('id, name')
      .in('id', uniqueProjectIds.map(id => parseInt(id as string, 10)));
      
    if (projectsError) {
      console.error("Error fetching project names:", projectsError);
      return accounts;
    }
    
    if (projectsData) {
      const projectMap = new Map(projectsData.map(p => [p.id.toString(), p.name]));
      
      // Create a new array with updated project names
      return accounts.map(account => {
        if (account.projectId && projectMap.has(account.projectId)) {
          return {
            ...account,
            projectName: projectMap.get(account.projectId) || ''
          };
        }
        return account;
      });
    }
  } catch (error) {
    console.error("Error enriching accounts with project names:", error);
  }
  
  return accounts;
}

/**
 * Displays an error toast notification
 */
export function showErrorToast(message: string = 'There was a problem loading your accounts. Please try again.') {
  toast({
    title: 'Error fetching accounts',
    description: message,
    variant: 'destructive',
  });
}

/**
 * Main function to fetch all account data with project names
 */
export async function fetchAllAccounts(): Promise<Account[]> {
  try {
    // Check authentication status first
    const { data: authData } = await supabase.auth.getSession();
    if (!authData.session) {
      console.warn("User not authenticated. Some features may not work properly.");
    }
    
    let accountData;
    try {
      // Try to fetch from the view first
      accountData = await fetchAccountDetailsFromView();
    } catch (viewError) {
      // If the view query fails, try the direct query
      accountData = await fetchAccountsDirectly();
    }
    
    if (accountData) {
      console.log("Query succeeded, accounts:", accountData.length);
      // Transform the data to match our Account type
      const formattedAccounts = transformAccountData(accountData);
      
      // Fetch project names for accounts with project IDs
      return await enrichWithProjectNames(formattedAccounts);
    }
    
    return [];
  } catch (err) {
    console.error('Error in fetchAllAccounts:', err);
    showErrorToast();
    throw err;
  }
}
