
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useAccounts } from "@/hooks/useAccounts";
import AccountsHeader from "./accounts/AccountsHeader";
import AccountsGrid from "./accounts/AccountsGrid";
import AccountTable from "./accounts/AccountTable";
import EmptyState from "./accounts/EmptyState";
import LoadingState from "./accounts/LoadingState";
import ErrorState from "./accounts/ErrorState";

interface AccountsTabProps {
  projectId: number;
}

const AccountsTab: React.FC<AccountsTabProps> = ({ projectId }) => {
  const navigate = useNavigate();
  const { accounts, isLoading, error, refreshAccounts } = useAccounts();
  
  const projectAccounts = accounts.filter(account => 
    String(account.projectId) === String(projectId)
  );
  
  const [view, setView] = useState<"grid" | "list">("grid");
  const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>({});

  useEffect(() => {
    refreshAccounts();
  }, []);

  const handleAddAccount = () => {
    navigate(`/accounts/new?projectId=${projectId}`);
  };

  const togglePasswordVisibility = (id: string) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState onRetry={refreshAccounts} />;
    }

    if (projectAccounts.length === 0) {
      return <EmptyState onAddAccount={handleAddAccount} />;
    }

    return view === "grid" ? (
      <AccountsGrid 
        accounts={projectAccounts}
        passwordVisibility={passwordVisibility}
        togglePasswordVisibility={togglePasswordVisibility}
      />
    ) : (
      <AccountTable accounts={projectAccounts} />
    );
  };

  return (
    <Card>
      <CardHeader>
        <AccountsHeader 
          view={view}
          setView={setView}
          onAddAccount={handleAddAccount}
        />
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default AccountsTab;
