
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Sun, Moon, Laptop, Check } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useAppearance } from "./AppearanceContext";
import { toast } from "@/components/ui/use-toast";

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  const { fontSize, setFontSize, colorScheme, setColorScheme, animations, setAnimations } = useAppearance();
  const [mounted, setMounted] = useState(false);
  
  // Use the useTheme hook for theme management
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const form = useForm({
    defaultValues: {
      fontSize,
      colorScheme,
      animations,
    },
  });

  // Update form when context values change
  useEffect(() => {
    form.reset({
      fontSize,
      colorScheme,
      animations,
    });
  }, [fontSize, colorScheme, animations, form]);

  function onSubmit(data: any) {
    setFontSize(data.fontSize);
    setColorScheme(data.colorScheme);
    setAnimations(data.animations);
    
    toast({
      title: "Appearance updated",
      description: "Your appearance settings have been saved."
    });
    
    console.log(data);
  }

  const handleThemeChange = (value: string) => {
    setTheme(value);
    console.log(`Theme set to: ${value}`);
  };

  // Only render theme controls after mounting to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="space-y-6">
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

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how Folio looks and feels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Font Size</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a font size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Adjust the font size for better readability.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colorScheme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color Scheme</FormLabel>
                    <div className="mb-4">
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a color scheme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="default">Default Blue</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="contrast">High Contrast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3 pt-2">
                      {[
                        { name: "Default Blue", value: "default", colors: ["#4263eb", "#93c5fd"] },
                        { name: "Purple", value: "purple", colors: ["#8b5cf6", "#c4b5fd"] },
                        { name: "Green", value: "green", colors: ["#10b981", "#6ee7b7"] },
                        { name: "High Contrast", value: "contrast", colors: ["#111827", "#f9fafb"] },
                      ].map((scheme) => (
                        <div 
                          key={scheme.value} 
                          className={`flex flex-col items-center`}
                          onClick={() => field.onChange(scheme.value)}
                        >
                          <div 
                            className={`h-12 w-full rounded-md cursor-pointer mb-1 relative ${field.value === scheme.value ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                            style={{ background: `linear-gradient(to right, ${scheme.colors[0]}, ${scheme.colors[1]})` }}
                          >
                            {field.value === scheme.value && (
                              <div className="absolute -top-1 -right-1 rounded-full bg-primary text-white p-0.5">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                          <span className="text-xs">{scheme.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <FormDescription className="mt-2">
                      Choose a color scheme that fits your style.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="animations"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Interface Animations
                      </FormLabel>
                      <FormDescription>
                        Enable animations for a more dynamic interface.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">Save preferences</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sidebar Options</CardTitle>
          <CardDescription>
            Customize your sidebar experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-collapse">Auto-collapse on small screens</Label>
              <Switch id="auto-collapse" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-labels">Always show labels</Label>
              <Switch id="show-labels" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="compact-mode">Compact mode</Label>
              <Switch id="compact-mode" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceSettings;
