
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Shield,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  Globe,
  Github,
  Twitter,
  Instagram,
  Linkedin,
  AtSign
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import AccountFilters from "@/components/accounts/AccountFilters";
import AccountGridView from "@/components/accounts/AccountGridView";
import ViewToggle from "@/components/accounts/ViewToggle";
import { accountsData } from "@/utils/accountData";
import { AccountFilters as AccountFiltersType } from "@/schemas/accountSchema";
import { getTypeIcon } from "@/utils/accountIcons";

const Accounts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState<AccountFiltersType>({
    type: null,
    projectId: null,
    expiryStatus: null
  });
  const [view, setView] = useState<"grid" | "list">("grid");
  
  const filteredAccounts = accountsData.filter(account => {
    const matchesSearch = 
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (account.projectName && account.projectName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;
    
    if (filters.type && account.type !== filters.type) return false;
    
    if (filters.projectId) {
      if (filters.projectId === "none" && account.projectId) return false;
      if (filters.projectId !== "none" && account.projectId?.toString() !== filters.projectId) return false;
    }
    
    if (filters.expiryStatus) {
      const today = new Date();
      const thirtyDaysFromNow = new Date(today);
      thirtyDaysFromNow.setDate(today.getDate() + 30);
      
      if (filters.expiryStatus === "expired") {
        if (!account.expiryDate || new Date(account.expiryDate) >= today) return false;
      } else if (filters.expiryStatus === "expiring-soon") {
        if (!account.expiryDate || 
            new Date(account.expiryDate) < today || 
            new Date(account.expiryDate) > thirtyDaysFromNow) return false;
      } else if (filters.expiryStatus === "active") {
        if (!account.expiryDate || new Date(account.expiryDate) < today) return false;
      } else if (filters.expiryStatus === "no-expiry") {
        if (account.expiryDate) return false;
      }
    }
    
    return true;
  });

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
  
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

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
      <motion.div variants={item} className="flex items-center justify-between">
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
      </motion.div>

      <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search accounts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
        <Card>
          <CardHeader>
            <CardTitle>Security Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <strong>Secure Storage:</strong> All login credentials are encrypted at rest using AES-256 encryption.
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <strong>Access Control:</strong> Only authorized team members can view full account details.
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <strong>Audit Trail:</strong> All credential access is logged for security purposes.
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link to="/settings/security">Security Settings</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

interface AccountsTableProps {
  accounts: typeof accountsData;
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
            <TableRow key={account.id}>
              <TableCell className="font-medium">{account.name}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="flex w-fit items-center gap-1">
                  {getTypeIcon(account.type) === 'Globe' && <Globe className="h-4 w-4" />}
                  {getTypeIcon(account.type) === 'Github' && <Github className="h-4 w-4" />}
                  {getTypeIcon(account.type) === 'Twitter' && <Twitter className="h-4 w-4" />}
                  {getTypeIcon(account.type) === 'Instagram' && <Instagram className="h-4 w-4" />}
                  {getTypeIcon(account.type) === 'Linkedin' && <Linkedin className="h-4 w-4" />}
                  {getTypeIcon(account.type) === 'AtSign' && <AtSign className="h-4 w-4" />}
                  <span className="capitalize">{account.type}</span>
                </Badge>
              </TableCell>
              <TableCell>
                {account.projectName ? 
                  <Link to={`/projects/${account.projectId}`} className="text-primary hover:underline">
                    {account.projectName}
                  </Link> : 
                  <span className="text-muted-foreground">—</span>
                }
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span>{account.username}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => copyToClipboard(account.username, "Username")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
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
                    <DropdownMenuItem asChild>
                      <a href={account.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Visit
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </DropdownMenuItem>
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

export default Accounts;
