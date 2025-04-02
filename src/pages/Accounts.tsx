
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { accountsData } from "@/utils/accountData";

// Import refactored components
import AccountsHeader from "@/components/accounts/AccountsHeader";
import AccountSearchInput from "@/components/accounts/AccountSearchInput";
import AccountFilters from "@/components/accounts/AccountFilters";
import AccountGridView from "@/components/accounts/AccountGridView";
import AccountsTable from "@/components/accounts/AccountsTable";
import SecurityInfoCard from "@/components/accounts/SecurityInfoCard";
import { useAccountFiltering } from "@/components/accounts/useAccountFiltering";

const Accounts: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>({});
  
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredAccounts,
    activeFiltersCount
  } = useAccountFiltering(accountsData);

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

      <motion.div variants={item}>
        <SecurityInfoCard />
      </motion.div>
    </motion.div>
  );
};

export default Accounts;
