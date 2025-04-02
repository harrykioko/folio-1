
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  MoreHorizontal,
  AlertTriangle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Account } from "@/utils/accountTypes";
import { copyToClipboard } from "@/utils/accountActions";
import { getTypeIcon, getPlatformIcon } from "@/utils/accountUtils";

interface AccountGridViewProps {
  accounts: Account[];
  passwordVisibility: Record<string, boolean>;
  togglePasswordVisibility: (id: string) => void;
}

const AccountGridView: React.FC<AccountGridViewProps> = ({
  accounts,
  passwordVisibility,
  togglePasswordVisibility,
}) => {
  if (accounts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No accounts found</p>
      </div>
    );
  }

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

  // Animation variants for cards
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
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {accounts.map((account) => (
        <motion.div key={account.id.toString()} variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="h-full flex flex-col backdrop-blur-xl bg-opacity-50 shadow-lg rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
                {account.type === "SocialMedia" && account.platform 
                  ? getPlatformIcon(account.platform) 
                  : getTypeIcon(account.type)}
                <span className="capitalize">
                  {account.type === "SocialMedia" && account.platform 
                    ? account.platform 
                    : account.type}
                </span>
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to={`/accounts/${account.id}`}>View Details</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/accounts/${account.id}/edit`}>Edit</Link>
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
              
              {account.projectId && (
                <div>
                  <span className="text-xs text-muted-foreground">Project:</span>
                  <Link 
                    to={`/projects/${account.projectId}`} 
                    className="ml-1 text-sm font-medium text-primary hover:underline"
                  >
                    {account.projectName || `Project #${account.projectId}`}
                  </Link>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Username:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{account.username}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full"
                      onClick={() => copyToClipboard(account.username, "Username")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Password:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{passwordVisibility[account.id.toString()] ? "password123" : "•••••••••"}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full"
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
            
            <CardFooter className="pt-2 flex justify-between items-center">
              <a
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 text-sm flex items-center"
              >
                {account.url && account.url.replace(/(^\w+:|^)\/\//, '').substring(0, 20)}
                {account.url && account.url.replace(/(^\w+:|^)\/\//, '').length > 20 ? '...' : ''}
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
              
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/accounts/${account.id}`}>Details</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AccountGridView;
