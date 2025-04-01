
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileAvatarProps = {
  initials: string;
  avatarUrl?: string;
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ initials, avatarUrl = "/placeholder.svg" }) => {
  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl} alt="Profile" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <Button variant="outline" size="sm">
          Change avatar
        </Button>
        <p className="text-xs text-muted-foreground">
          JPG, GIF or PNG. 1MB max.
        </p>
      </div>
    </div>
  );
};

export default ProfileAvatar;
