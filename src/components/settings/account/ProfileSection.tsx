
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ProfileHeader, 
  ProfileAvatar, 
  ProfileForm, 
  AuthenticationStatus,
  useProfileData
} from "./profile";
import { useProfileSubmit } from "./profile/useProfileSubmit";

const ProfileSection = () => {
  const { 
    user, 
    userMetadata, 
    authStatus, 
    getInitials,
    getDisplayName,
    getEmail 
  } = useProfileData();
  
  const { isLoading, handleSubmit } = useProfileSubmit(user?.id, userMetadata);

  // Debug information
  useEffect(() => {
    console.log("ProfileSection render data:", {
      user: user ? "present" : "missing",
      userMetadata: userMetadata ? "present" : "missing",
      authStatus,
      displayName: getDisplayName(),
      email: getEmail(),
      initials: getInitials()
    });
    
    if (userMetadata) {
      console.log("UserMetadata details:", {
        fullName: userMetadata.fullName,
        email: userMetadata.email,
        id: userMetadata.id
      });
    }
  }, [user, userMetadata, authStatus, getDisplayName, getEmail, getInitials]);

  // Fixed conditional: Only show AuthenticationStatus if NOT authenticated 
  // (the bug was showing this even when authenticated but userMetadata was null)
  if (authStatus !== "Authenticated") {
    return <AuthenticationStatus status={authStatus} />;
  }

  // Even if we're authenticated but userMetadata is still loading, show the profile form
  // with the basic data we have from the auth user object
  return (
    <Card>
      <ProfileHeader 
        title="Profile" 
        description="Update your personal information and how others see you on the platform."
      />
      <CardContent className="space-y-6">
        <ProfileAvatar 
          initials={getInitials()} 
          avatarUrl={(userMetadata?.avatarUrl) || "/placeholder.svg"} 
        />

        <ProfileForm
          initialData={{
            name: getDisplayName(),
            email: getEmail(),
            bio: userMetadata?.bio || "",
          }}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
