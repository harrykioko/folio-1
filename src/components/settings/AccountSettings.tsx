
import React, { useEffect, useRef } from "react";
import { ProfileSection, PasswordSection, MFASection, DangerZoneSection } from "./account";

interface AccountSettingsProps {
  focusSection?: "profile" | "security" | "mfa" | "danger";
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ focusSection }) => {
  const securityRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (focusSection === "security" && securityRef.current) {
      securityRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [focusSection]);

  return (
    <div className="space-y-6">
      <ProfileSection />
      <div ref={securityRef}>
        <PasswordSection />
      </div>
      <MFASection />
      <DangerZoneSection />
    </div>
  );
};

export default AccountSettings;
