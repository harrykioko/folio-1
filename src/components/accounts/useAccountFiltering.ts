
import { useState, useEffect, useMemo } from "react";
import { Account, AccountType } from "@/utils/accountTypes";

// Define AccountFilters type
export type AccountFilters = {
  type: string;
  platform: string;
  projectId: string;
  expiryStatus: string;
};

export const useAccountFiltering = (initialAccounts: Account[] = []) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<AccountFilters>({
    type: "",
    platform: "",
    projectId: "",
    expiryStatus: "",
  });
  
  // Track active filters count for UI
  const activeFiltersCount = useMemo(() => {
    return Object.values(filters).filter(value => value !== "").length;
  }, [filters]);
  
  // Function to filter accounts based on search query and filters
  const filterAccounts = (accounts: Account[]) => {
    return accounts.filter((account) => {
      // Search query filtering
      const matchesSearch =
        searchQuery === "" ||
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (account.username && account.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (account.url && account.url.toLowerCase().includes(searchQuery.toLowerCase()));

      // Type filtering
      const matchesType =
        filters.type === "" || account.type === filters.type;

      // Platform filtering
      const matchesPlatform =
        filters.platform === "" || 
        (account.platform && account.platform === filters.platform);

      // Project filtering
      const matchesProject =
        filters.projectId === "" ||
        (filters.projectId === "none" && !account.projectId) ||
        (account.projectId && account.projectId.toString() === filters.projectId);

      // Expiry status filtering
      let matchesExpiryStatus = true;
      if (filters.expiryStatus !== "") {
        const today = new Date();
        const thirtyDaysFromNow = new Date(today);
        thirtyDaysFromNow.setDate(today.getDate() + 30);

        if (filters.expiryStatus === "expired") {
          matchesExpiryStatus = account.expiryDate ? new Date(account.expiryDate) < today : false;
        } else if (filters.expiryStatus === "expiring-soon") {
          matchesExpiryStatus = account.expiryDate ? 
            (new Date(account.expiryDate) >= today && new Date(account.expiryDate) <= thirtyDaysFromNow) : 
            false;
        } else if (filters.expiryStatus === "active") {
          matchesExpiryStatus = account.expiryDate ? new Date(account.expiryDate) > thirtyDaysFromNow : false;
        } else if (filters.expiryStatus === "no-expiry") {
          matchesExpiryStatus = !account.expiryDate;
        }
      }

      return matchesSearch && matchesType && matchesPlatform && matchesProject && matchesExpiryStatus;
    });
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    activeFiltersCount,
    filterAccounts
  };
};
