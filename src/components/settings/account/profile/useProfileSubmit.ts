
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { upsertUserMetadata } from "@/services/userProfileService";
import { ProfileFormValues } from "./ProfileForm";

export const useProfileSubmit = (userId: string | undefined, userMetadata: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ProfileFormValues) => {
    // Check authentication
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be logged in to update your profile.",
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
    isLoading,
    handleSubmit
  };
};
