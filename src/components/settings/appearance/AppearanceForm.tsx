
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAppearance } from "../AppearanceContext";
import { toast } from "@/components/ui/use-toast";

const AppearanceForm = () => {
  const { fontSize, setFontSize, colorScheme, setColorScheme, animations, setAnimations } = useAppearance();

  const form = useForm({
    defaultValues: {
      fontSize,
      colorScheme,
      animations,
    },
  });
  
  // Update form when context values change
  React.useEffect(() => {
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

  return (
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
                    value={field.value || "medium"}
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
                      value={field.value || "default"}
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
  );
};

export default AppearanceForm;
