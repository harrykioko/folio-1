
import React from "react";
import { motion } from "framer-motion";
import { Account } from "@/utils/accountTypes";
import AccountCard from "./AccountCard";

interface AccountsGridProps {
  accounts: Account[];
  passwordVisibility: Record<string, boolean>;
  togglePasswordVisibility: (id: string) => void;
}

const AccountsGrid: React.FC<AccountsGridProps> = ({
  accounts,
  passwordVisibility,
  togglePasswordVisibility
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {accounts.map((account) => (
        <AccountCard 
          key={account.id}
          account={account}
          passwordVisibility={passwordVisibility}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      ))}
    </motion.div>
  );
};

export default AccountsGrid;
