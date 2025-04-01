
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { upsertUserMetadata } from "@/services/userProfileService";
import { supabase } from "@/lib/supabase";
import { ProfileFormValues } from "./ProfileForm";

export const useProfileData = () => {
  const { user, userMetadata, session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (data: ProfileFormValues) => {
    // Check authentication with more detailed error info
    if (!session) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Your session has expired. Please log in again.",
      });
      return;
    }

    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "User data not available. Please refresh the page.",
      });
      return;
    }

    if (!userMetadata) {
      toast({
        variant: "destructive",
        title: "Profile Error",
        description: "Your profile data could not be loaded. Please refresh the page.",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Update user metadata including bio
      const success = await upsertUserMetadata(
        user.id, // Use user.id directly from the auth user
        data.email,
        data.name,
        data.bio
      );

      if (!success) {
        throw new Error("Failed to update profile");
      }

      // If email changed, update it through auth API
      if (data.email !== userMetadata.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email
        });

        if (emailError) {
          throw new Error(emailError.message);
        }
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    userMetadata,
    session,
    isLoading,
    authStatus,
    getInitials,
    handleSubmit
  };
};
