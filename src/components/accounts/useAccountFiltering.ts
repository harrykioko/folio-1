
import { useState, useMemo } from "react";
import { Account } from "@/utils/accountTypes";
import { AccountFilters } from "@/schemas/accountSchema";

export interface ExtendedAccountFilters extends AccountFilters {
  platform: string | null;
}

export const useAccountFiltering = (accounts: Account[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<ExtendedAccountFilters>({
    type: null,
    platform: null,
    projectId: null,
    expiryStatus: null
  });

  const filteredAccounts = useMemo(() => {
    return accounts.filter(account => {
      const matchesSearch = 
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (account.projectName && account.projectName.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (!matchesSearch) return false;
      
      if (filters.type && account.type !== filters.type) return false;
      
      if (filters.type === "SocialMedia" && filters.platform && account.platform !== filters.platform) {
        return false;
      }
      
      if (filters.projectId) {
        if (filters.projectId === "none" && account.projectId) return false;
        if (filters.projectId !== "none" && account.projectId?.toString() !== filters.projectId) return false;
      }
      
      if (filters.expiryStatus) {
        const today = new Date();
        const thirtyDaysFromNow = new Date(today);
        thirtyDaysFromNow.setDate(today.getDate() + 30);
        
        if (filters.expiryStatus === "expired") {
          if (!account.expiryDate || new Date(account.expiryDate) >= today) return false;
        } else if (filters.expiryStatus === "expiring-soon") {
          if (!account.expiryDate || 
              new Date(account.expiryDate) < today || 
              new Date(account.expiryDate) > thirtyDaysFromNow) return false;
        } else if (filters.expiryStatus === "active") {
          if (!account.expiryDate || new Date(account.expiryDate) < today) return false;
        } else if (filters.expiryStatus === "no-expiry") {
          if (account.expiryDate) return false;
        }
      }
      
      return true;
    });
  }, [accounts, searchQuery, filters]);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredAccounts,
    activeFiltersCount
  };
};
