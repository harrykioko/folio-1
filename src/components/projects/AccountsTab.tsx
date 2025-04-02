import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { 
  Plus, 
  Copy, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  MoreHorizontal,
  AlertTriangle,
  LayoutGrid,
  List
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { copyToClipboard } from "@/utils/accountActions";
import { getTypeIcon, getPlatformIcon } from "@/utils/accountUtils";
import { useAccounts } from "@/hooks/useAccounts";

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

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'domain':
        return <Globe className="h-5 w-5" />;
      case 'repository':
        return <Github className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'service':
        return <AtSign className="h-5 w-5" />;
      default:
        return null;
    }
  };

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

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Linked Accounts</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-10">
          <p>Loading accounts...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Linked Accounts</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-10 text-destructive">
          <p>Error loading accounts. Please try again.</p>
          <Button variant="outline" className="mt-4" onClick={refreshAccounts}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (projectAccounts.length === 0) {
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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Linked Accounts</CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex border rounded-md">
              <Toggle
                pressed={view === "grid"}
                onPressedChange={() => setView("grid")}
                className="px-3 data-[state=on]:bg-muted"
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={view === "list"}
                onPressedChange={() => setView("list")}
                className="px-3 data-[state=on]:bg-muted"
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Toggle>
            </div>
            <Button onClick={handleAddAccount}>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {view === "grid" ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {projectAccounts.map((account) => (
              <motion.div key={account.id} variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full flex flex-col backdrop-blur-xl bg-opacity-50 shadow-md rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
                      {getTypeIcon(account.type)}
                      <span className="capitalize">{account.type}</span>
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem 
                          onClick={() => navigate(`/accounts/${account.id}`)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => navigate(`/accounts/${account.id}/edit`)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <a href={account.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            Visit Site
                            <ExternalLink className="ml-auto h-4 w-4" />
                          </a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  
                  <CardContent className="flex flex-col flex-grow space-y-3">
                    <CardTitle className="line-clamp-1 text-lg">{account.name}</CardTitle>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Username:</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{account.username}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-full"
                            onClick={() => copyToClipboard(account.username || '', "Username")}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Password:</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{passwordVisibility[account.id] ? "password123" : "•••••••••"}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => togglePasswordVisibility(account.id)}
                          >
                            {passwordVisibility[account.id] ? (
                              <EyeOff className="h-3 w-3" />
                            ) : (
                              <Eye className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => copyToClipboard("password123", "Password")}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {account.expiryDate && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Expires:</span>
                          <div className="flex items-center gap-1">
                            <Badge 
                              variant={isExpired(account.expiryDate) ? "destructive" : isExpiringSoon(account.expiryDate) ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {isExpired(account.expiryDate) && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {account.expiryDate}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <div className="p-3 pt-0 mt-auto">
                    <a
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm flex items-center"
                    >
                      {account.url?.replace(/(^\w+:|^)\/\//, '').substring(0, 20)}
                      {account.url && account.url.replace(/(^\w+:|^)\/\//, '').length > 20 ? '...' : ''}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
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
              {projectAccounts.map((account) => (
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
        )}
      </CardContent>
    </Card>
  );
};

export default AccountsTab;
