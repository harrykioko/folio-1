
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Sun, Moon, Laptop } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState("system");
  
  const form = useForm({
    defaultValues: {
      fontSize: "medium",
      colorScheme: "default",
      animations: true,
    },
  });

  function onSubmit(data: any) {
    console.log(data);
    // In a real app, this would save preferences and update UI
  }

  const handleThemeChange = (value: string) => {
    setTheme(value);
    // In a real app, this would update the theme
    console.log(`Theme set to: ${value}`);
  };

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
                <div className="border-2 hover:border-primary rounded-md overflow-hidden transition-all cursor-pointer" onClick={() => handleThemeChange("light")}>
                  <div className="bg-[#f8fafc] w-[100px] h-[80px] p-2">
                    <div className="bg-[#e2e8f0] h-2 w-10 rounded mb-2"></div>
                    <div className="bg-[#e2e8f0] h-2 w-12 rounded mb-2"></div>
                    <div className="bg-[#e2e8f0] h-2 w-8 rounded"></div>
                  </div>
                </div>
                <span className="text-xs font-medium">Light</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="border-2 hover:border-primary rounded-md overflow-hidden transition-all cursor-pointer" onClick={() => handleThemeChange("dark")}>
                  <div className="bg-[#1e293b] w-[100px] h-[80px] p-2">
                    <div className="bg-[#475569] h-2 w-10 rounded mb-2"></div>
                    <div className="bg-[#475569] h-2 w-12 rounded mb-2"></div>
                    <div className="bg-[#475569] h-2 w-8 rounded"></div>
                  </div>
                </div>
                <span className="text-xs font-medium">Dark</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="border-2 hover:border-primary rounded-md overflow-hidden transition-all cursor-pointer" onClick={() => handleThemeChange("system")}>
                  <div className="bg-gradient-to-br from-[#f8fafc] to-[#1e293b] w-[100px] h-[80px] p-2">
                    <div className="bg-white/20 h-2 w-10 rounded mb-2"></div>
                    <div className="bg-white/20 h-2 w-12 rounded mb-2"></div>
                    <div className="bg-white/20 h-2 w-8 rounded"></div>
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
                      defaultValue={field.value}
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
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
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
                    <FormDescription>
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
