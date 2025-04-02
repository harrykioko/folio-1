
import React from "react";
import { useNavigate } from "react-router-dom";
import { Account } from "@/utils/accountTypes";
import { getTypeIcon } from "@/utils/accountUtils";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface AccountTableProps {
  accounts: Account[];
}

const AccountTable: React.FC<AccountTableProps> = ({ accounts }) => {
  const navigate = useNavigate();
  
  const isExpired = (date: string | undefined) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  const isExpiringSoon = (date: string | undefined) => {
    if (!date) return false;
    const expiryDate = new Date(date);
    const today = new Date();
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    return expiryDate > today && expiryDate < thirtyDaysFromNow;
  };
  
  return (
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
                href={account.url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-blue-500 hover:underline"
              >
                {account.url?.replace(/(^\w+:|^)\/\//, '')}
              </a>
            </TableCell>
            <TableCell>
              {account.expiryDate ? (
                <Badge 
                  variant={isExpired(account.expiryDate) ? "destructive" : isExpiringSoon(account.expiryDate) ? "default" : "secondary"}
                >
                  {account.expiryDate}
                </Badge>
              ) : "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountTable;
