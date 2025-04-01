
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { upsertUserMetadata } from "@/services/userProfileService";
import { ProfileFormValues } from "./ProfileForm";

export const useProfileSubmit = (userId: string | undefined, userMetadata: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ProfileFormValues) => {
    // Enhanced debug logging
    console.log("Profile update attempt:", { 
      userId,
      userMetadata: userMetadata ? "present" : "missing",
      formData: data
    });
    
    // Check authentication
    if (!userId) {
      console.error("Authentication error: userId is undefined or null");
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be logged in to update your profile.",
      });
      return;
    }

    if (!userMetadata) {
      console.error("Profile error: userMetadata is undefined or null");
      toast({
        variant: "destructive",
        title: "Profile Error",
        description: "Your profile data could not be loaded. Please refresh the page.",
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Updating user metadata:", { userId, ...data });
      
      // Update user metadata including bio
      const success = await upsertUserMetadata(
        userId,
        data.email,
        data.name,
        data.bio
      );

      if (!success) {
        throw new Error("Failed to update profile");
      }

      // If email changed, update it through auth API
      if (data.email !== userMetadata.email) {
        console.log("Updating email through auth API");
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
      
      // Force reload to reflect changes immediately
      window.location.reload();
      
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
    isLoading,
    handleSubmit
  };
};
