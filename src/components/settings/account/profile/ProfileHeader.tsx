
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type ProfileHeaderProps = {
  title: string;
  description: string;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ title, description }) => {
  return (
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
};

export default ProfileHeader;
