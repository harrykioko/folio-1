
import React from 'react';
import { UserIcon, Lock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Import NavigationMenu components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const AccountMenu = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Account</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-2 min-w-[220px]">
              <NavigationMenuLink 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => navigate('/settings')}
              >
                <UserIcon size={16} />
                <span>Profile</span>
              </NavigationMenuLink>
              
              <NavigationMenuLink 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => navigate('/settings')}
              >
                <Lock size={16} />
                <span>Security</span>
              </NavigationMenuLink>
              
              <NavigationMenuLink 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AccountMenu;
