
import React from "react";
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
  console.log("ProfileSection render:", {
    user: user ? "present" : "missing",
    userMetadata: userMetadata ? "present" : "missing",
    authStatus
  });

  // If we're not authenticated, show a friendly message
  if (authStatus !== "Authenticated" || !userMetadata) {
    return <AuthenticationStatus status={authStatus} />;
  }

  return (
    <Card>
      <ProfileHeader 
        title="Profile" 
        description="Update your personal information and how others see you on the platform."
      />
      <CardContent className="space-y-6">
        <ProfileAvatar 
          initials={getInitials()} 
          avatarUrl={userMetadata.avatarUrl || "/placeholder.svg"} 
        />

        <ProfileForm
          initialData={{
            name: userMetadata.fullName || getDisplayName() || "",
            email: userMetadata.email || getEmail() || "",
            bio: userMetadata.bio || "",
          }}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
