
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export const useProfileData = () => {
  const { user, userMetadata, session } = useAuth();
  const [authStatus, setAuthStatus] = useState<string>("Checking auth status...");

  // Debug authentication status when component mounts
  useEffect(() => {
    console.log("Auth state:", { 
      user: user ? "present" : "missing", 
      userMetadata: userMetadata ? "present" : "missing",
      session: session ? "present" : "missing"
    });
    
    if (userMetadata) {
      console.log("User metadata in useProfileData:", {
        fullName: userMetadata.fullName,
        email: userMetadata.email,
        id: userMetadata.id
      });
    }
    
    if (session && user) {
      setAuthStatus("Authenticated");
    } else {
      setAuthStatus("Not authenticated");
    }
  }, [user, userMetadata, session]);

  // Generate initials for avatar fallback
  const getInitials = () => {
    if (userMetadata?.fullName) {
      return userMetadata.fullName
        .split(" ")
        .map(name => name[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    
    return user?.email ? user.email[0].toUpperCase() : "U";
  };

  // Get display name for the UI - ALWAYS prioritize the fullName from userMetadata (from users table)
  const getDisplayName = () => {
    // Check for and prioritize fullName from userMetadata
    if (userMetadata?.fullName) {
      return userMetadata.fullName;
    }
    
    // Fallback to user email if available (but without domain)
    if (user?.email) {
      return user.email.split('@')[0];
    }
    
    // Default fallback
    return "User";
  };

  // Get user email
  const getEmail = () => {
    // Prioritize email from userMetadata if available
    if (userMetadata?.email) {
      return userMetadata.email;
    }
    
    // Fallback to auth user email
    return user?.email || "";
  };

  return {
    user,
    userMetadata,
    session,
    authStatus,
    getInitials,
    getDisplayName,
    getEmail
  };
};
