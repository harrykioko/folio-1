
import { useState, useEffect, useMemo } from "react";
import { Account, AccountType } from "@/utils/accountTypes";

export type AccountFilters = {
  types: AccountType[];
  projects: number[];
};

export const useAccountFiltering = (initialAccounts: Account[] = []) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<AccountFilters>({
    types: [],
    projects: [],
  });
  
  // Track active filters count for UI
  const activeFiltersCount = useMemo(() => {
    return filters.types.length + filters.projects.length;
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
        filters.types.length === 0 || filters.types.includes(account.type);

      // Project filtering
      const matchesProject =
        filters.projects.length === 0 ||
        (account.projectId && filters.projects.includes(account.projectId));

      return matchesSearch && matchesType && matchesProject;
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
