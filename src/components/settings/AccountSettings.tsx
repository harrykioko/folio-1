
import React from "react";
import { ProfileSection, PasswordSection, MFASection, DangerZoneSection } from "./account";

const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <ProfileSection />
      <PasswordSection />
      <MFASection />
      <DangerZoneSection />
    </div>
  );
};

export default AccountSettings;
