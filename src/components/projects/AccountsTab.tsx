
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, Globe, Github, Twitter, Instagram, Linkedin, AtSign } from "lucide-react";
import { accountsData } from "@/utils/accountData";
import { getTypeIcon } from "@/utils/accountIcons";

interface AccountsTabProps {
  projectId: number;
}

const AccountsTab: React.FC<AccountsTabProps> = ({ projectId }) => {
  const navigate = useNavigate();
  const accounts = accountsData.filter(account => account.projectId === projectId);

  const handleAddAccount = () => {
    navigate(`/accounts/new?projectId=${projectId}`);
  };

  if (accounts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Linked Accounts</CardTitle>
            <Button onClick={handleAddAccount}>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-muted-foreground">
            <p>No accounts have been linked to this project yet.</p>
            <Button variant="outline" className="mt-4" onClick={handleAddAccount}>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Linked Accounts</CardTitle>
          <Button onClick={handleAddAccount}>
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Expiry Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow 
                key={account.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/accounts/${account.id}`)}
              >
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getTypeIcon(account.type)}
                    <span className="ml-2 capitalize">{account.type}</span>
                  </div>
                </TableCell>
                <TableCell>{account.username}</TableCell>
                <TableCell>
                  <a 
                    href={account.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-500 hover:underline"
                  >
                    {account.url.replace(/(^\w+:|^)\/\//, '')}
                  </a>
                </TableCell>
                <TableCell>{account.expiryDate || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AccountsTab;
