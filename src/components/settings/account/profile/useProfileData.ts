
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
    
    if (session && user) {
      setAuthStatus("Authenticated");
    } else {
      setAuthStatus("Not authenticated");
    }
  }, [user, userMetadata, session]);

  // Generate initials for avatar fallback
  const getInitials = () => {
    if (!userMetadata?.fullName) return "U";
    return userMetadata.fullName
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return {
    user,
    userMetadata,
    session,
    authStatus,
    getInitials
  };
};
