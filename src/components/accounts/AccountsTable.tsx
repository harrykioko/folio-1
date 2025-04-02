
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  MoreHorizontal, 
  Copy,
  Eye,
  EyeOff,
  ExternalLink
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTypeIcon, getPlatformIcon } from "@/utils/accountUtils";
import { Account } from "@/utils/accountTypes";

interface AccountsTableProps {
  accounts: Account[];
  passwordVisibility: Record<string, boolean>;
  togglePasswordVisibility: (id: string) => void;
  copyToClipboard: (text: string, type: string) => void;
}

const AccountsTable: React.FC<AccountsTableProps> = ({ 
  accounts, 
  passwordVisibility, 
  togglePasswordVisibility, 
  copyToClipboard
}) => {
  if (accounts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No accounts found</p>
      </div>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id.toString()}>
              <TableCell className="font-medium">{account.name}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="flex w-fit items-center gap-1">
                  {account.type === "SocialMedia" && account.platform 
                    ? getPlatformIcon(account.platform) 
                    : getTypeIcon(account.type)}
                  <span className="capitalize">
                    {account.type === "SocialMedia" && account.platform 
                      ? account.platform 
                      : account.type}
                  </span>
                </Badge>
              </TableCell>
              <TableCell>
                {account.projectId ? 
                  <Link to={`/projects/${account.projectId}`} className="text-primary hover:underline">
                    {account.projectName || `Project #${account.projectId}`}
                  </Link> : 
                  <span className="text-muted-foreground">—</span>
                }
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span>{account.username || "—"}</span>
                  {account.username && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => copyToClipboard(account.username, "Username")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span>{passwordVisibility[account.id.toString()] ? "password123" : "•••••••••"}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => togglePasswordVisibility(account.id.toString())}
                  >
                    {passwordVisibility[account.id.toString()] ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard("password123", "Password")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                {account.expiryDate ? (
                  <Badge variant={
                    new Date(account.expiryDate) < new Date() ? 
                    "destructive" : 
                    new Date(account.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ?
                    "default" : "secondary"
                  }>
                    {account.expiryDate}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/accounts/${account.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/accounts/${account.id}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {account.url && (
                      <DropdownMenuItem asChild>
                        <a href={account.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          Visit
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default AccountsTable;
