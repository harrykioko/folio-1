
import React from "react";
import { ProfileSection, PasswordSection, DangerZoneSection } from "./account";

const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <ProfileSection />
      <PasswordSection />
      <DangerZoneSection />
    </div>
  );
};

export default AccountSettings;
