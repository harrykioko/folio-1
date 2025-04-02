
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import ViewToggle from "./ViewToggle";

interface AccountsHeaderProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}

const AccountsHeader: React.FC<AccountsHeaderProps> = ({ view, setView }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Account Management</h1>
      <div className="flex items-center gap-3">
        <ViewToggle view={view} onChange={setView} />
        <Button asChild>
          <Link to="/accounts/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AccountsHeader;
