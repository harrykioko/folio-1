
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Moon, Laptop, Check } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  
  const handleThemeChange = (value: string) => {
    setTheme(value);
    console.log(`Theme set to: ${value}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>
          Choose the theme for your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ToggleGroup 
            type="single" 
            value={theme} 
            onValueChange={(value) => value && handleThemeChange(value)}
            className="flex justify-start"
          >
            <ToggleGroupItem value="light" aria-label="Light mode">
              <Sun className="h-5 w-5 mr-2" />
              Light
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="Dark mode">
              <Moon className="h-5 w-5 mr-2" />
              Dark
            </ToggleGroupItem>
            <ToggleGroupItem value="system" aria-label="System default">
              <Laptop className="h-5 w-5 mr-2" />
              System
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="flex flex-col items-center gap-2">
              <div 
                className={`border-2 ${theme === 'light' ? 'border-primary' : 'border-border hover:border-primary'} rounded-md overflow-hidden transition-all cursor-pointer`} 
                onClick={() => handleThemeChange("light")}
              >
                <div className="bg-[#f8fafc] w-[100px] h-[80px] p-2 relative">
                  <div className="bg-[#e2e8f0] h-2 w-10 rounded mb-2"></div>
                  <div className="bg-[#e2e8f0] h-2 w-12 rounded mb-2"></div>
                  <div className="bg-[#e2e8f0] h-2 w-8 rounded"></div>
                  {theme === 'light' && (
                    <div className="absolute bottom-2 right-2 rounded-full bg-primary text-white p-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
              <span className="text-xs font-medium">Light</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div 
                className={`border-2 ${theme === 'dark' ? 'border-primary' : 'border-border hover:border-primary'} rounded-md overflow-hidden transition-all cursor-pointer`} 
                onClick={() => handleThemeChange("dark")}
              >
                <div className="bg-[#1e293b] w-[100px] h-[80px] p-2 relative">
                  <div className="bg-[#475569] h-2 w-10 rounded mb-2"></div>
                  <div className="bg-[#475569] h-2 w-12 rounded mb-2"></div>
                  <div className="bg-[#475569] h-2 w-8 rounded"></div>
                  {theme === 'dark' && (
                    <div className="absolute bottom-2 right-2 rounded-full bg-primary text-white p-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
              <span className="text-xs font-medium">Dark</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div 
                className={`border-2 ${theme === 'system' ? 'border-primary' : 'border-border hover:border-primary'} rounded-md overflow-hidden transition-all cursor-pointer`} 
                onClick={() => handleThemeChange("system")}
              >
                <div className="bg-gradient-to-br from-[#f8fafc] to-[#1e293b] w-[100px] h-[80px] p-2 relative">
                  <div className="bg-white/20 h-2 w-10 rounded mb-2"></div>
                  <div className="bg-white/20 h-2 w-12 rounded mb-2"></div>
                  <div className="bg-white/20 h-2 w-8 rounded"></div>
                  {theme === 'system' && (
                    <div className="absolute bottom-2 right-2 rounded-full bg-primary text-white p-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
              <span className="text-xs font-medium">System</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeSelector;
