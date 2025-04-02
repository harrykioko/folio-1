
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

// Import refactored components
import AccountsHeader from "@/components/accounts/AccountsHeader";
import AccountSearchInput from "@/components/accounts/AccountSearchInput";
import AccountFilters from "@/components/accounts/AccountFilters";
import AccountGridView from "@/components/accounts/AccountGridView";
import AccountsTable from "@/components/accounts/AccountsTable";
import SecurityInfoCard from "@/components/accounts/SecurityInfoCard";
import { useAccountFiltering } from "@/components/accounts/useAccountFiltering";
import { useAccounts } from "@/hooks/useAccounts";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Accounts: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>({});
  
  const { accounts, isLoading, error, refreshAccounts } = useAccounts();

  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    activeFiltersCount,
    filterAccounts
  } = useAccountFiltering([]);

  // Apply filtering to the accounts fetched from Supabase
  const filteredAccounts = filterAccounts(accounts);

  const togglePasswordVisibility = (id: string) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${type} has been copied to your clipboard.`,
    });
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  if (error) {
    return (
      <Alert variant="destructive" className="my-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load accounts. Please try refreshing the page or contact support.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <motion.div 
      className="space-y-6 animate-fade-in"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <AccountsHeader view={view} setView={setView} />
      </motion.div>

      <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
        <AccountSearchInput 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        <AccountFilters 
          filters={filters} 
          setFilters={setFilters} 
          activeFiltersCount={activeFiltersCount}
        />
      </motion.div>

      {isLoading ? (
        <motion.div variants={item} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-[300px] w-full rounded-lg" />
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div variants={item}>
          {view === "grid" ? (
            <AccountGridView 
              accounts={filteredAccounts} 
              passwordVisibility={passwordVisibility}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          ) : (
            <AccountsTable 
              accounts={filteredAccounts} 
              passwordVisibility={passwordVisibility}
              togglePasswordVisibility={togglePasswordVisibility}
              copyToClipboard={copyToClipboard}
            />
          )}
        </motion.div>
      )}

      <motion.div variants={item}>
        <SecurityInfoCard />
      </motion.div>
    </motion.div>
  );
};

export default Accounts;
