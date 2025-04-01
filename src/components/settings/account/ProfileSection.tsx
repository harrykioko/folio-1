
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ProfileHeader, 
  ProfileAvatar, 
  ProfileForm, 
  AuthenticationStatus,
  useProfileData
} from "./profile";

const ProfileSection = () => {
  const { 
    userMetadata, 
    isLoading, 
    authStatus, 
    getInitials, 
    handleSubmit 
  } = useProfileData();

  // If we're not authenticated, show a friendly message
  if (authStatus !== "Authenticated" && !userMetadata) {
    return <AuthenticationStatus status={authStatus} />;
  }

  return (
    <Card>
      <ProfileHeader 
        title="Profile" 
        description="Update your personal information and how others see you on the platform."
      />
      <CardContent className="space-y-6">
        <ProfileAvatar initials={getInitials()} />

        {userMetadata && (
          <ProfileForm
            initialData={{
              name: userMetadata.fullName || "",
              email: userMetadata.email || "",
              bio: userMetadata.bio || "",
            }}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
