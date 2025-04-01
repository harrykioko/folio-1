
import React, { useState, useEffect } from "react";
import ThemeSelector from "./appearance/ThemeSelector";
import AppearanceForm from "./appearance/AppearanceForm";
import SidebarOptions from "./appearance/SidebarOptions";

const AppearanceSettings = () => {
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render after mounting to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <ThemeSelector />
      <AppearanceForm />
      <SidebarOptions />
    </div>
  );
};

export default AppearanceSettings;
