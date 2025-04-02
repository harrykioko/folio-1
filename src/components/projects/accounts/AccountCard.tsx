
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Copy, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  MoreHorizontal,
  AlertTriangle 
} from "lucide-react";
import { motion } from "framer-motion";
import { Account } from "@/utils/accountTypes";
import { copyToClipboard } from "@/utils/accountActions";
import { getTypeIcon } from "@/utils/accountUtils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AccountCardProps {
  account: Account;
  passwordVisibility: Record<string, boolean>;
  togglePasswordVisibility: (id: string) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ 
  account, 
  passwordVisibility, 
  togglePasswordVisibility 
}) => {
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
    <motion.div variants={{
      hidden: { y: 20, opacity: 0 },
      show: { y: 0, opacity: 1, transition: { duration: 0.3 } }
    }} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
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
  );
};

export default AccountCard;
