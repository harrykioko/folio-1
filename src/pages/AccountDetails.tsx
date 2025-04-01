
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Clock, 
  Globe,
  Github,
  Twitter, 
  Instagram, 
  Linkedin, 
  AtSign, 
  Bookmark,
  Save,
  ArrowLeft,
  Copy,
  Eye,
  EyeOff,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Mock data for projects
const projects = [
  { id: 1, name: "Project Alpha" },
  { id: 2, name: "Dashboard X" },
  { id: 3, name: "LMS Portal" },
  { id: 4, name: "Data Visualizer" },
  { id: 5, name: "Analytics Engine" }
];

// Mock data for account types
const accountTypes = [
  { id: "domain", name: "Domain" },
  { id: "github", name: "GitHub" },
  { id: "twitter", name: "Twitter" },
  { id: "instagram", name: "Instagram" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "service", name: "Service/Platform" }
];

// Sample account data (in a real app this would come from an API)
const accountsData = [
  { 
    id: 1, 
    name: "Project Alpha Website", 
    type: "domain",
    url: "https://alpha-project.com", 
    username: "admin", 
    password: "password123",
    notes: "Main website for Project Alpha. Renewal handled by IT department.",
    expiryDate: "2023-12-15",
    projectId: 1,
    projectName: "Project Alpha"
  },
  { 
    id: 2, 
    name: "Project Alpha GitHub", 
    type: "github",
    url: "https://github.com/org/project-alpha", 
    username: "developer", 
    password: "github_pass",
    notes: "Main repository for project code. All team members have access.",
    expiryDate: null,
    projectId: 1,
    projectName: "Project Alpha"
  },
  // More accounts would be here...
];

// Form schema validation
const accountFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z.string({ required_error: "Please select an account type." }),
  url: z.string().url({ message: "Please enter a valid URL." }),
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
  projectId: z.string().optional(),
  expiryDate: z.string().optional(),
  notes: z.string().optional(),
  savePassword: z.boolean().default(true),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const AccountDetails: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  const [account, setAccount] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "",
      type: "",
      url: "",
      username: "",
      password: "",
      projectId: "",
      expiryDate: "",
      notes: "",
      savePassword: true,
    },
  });

  // Fetch account data
  useEffect(() => {
    // In a real app, you would fetch from an API
    const fetchAccountData = () => {
      setLoading(true);
      try {
        const foundAccount = accountsData.find(a => a.id === parseInt(accountId || "0"));
        
        if (foundAccount) {
          setAccount(foundAccount);
          
          // Set form values
          form.reset({
            name: foundAccount.name,
            type: foundAccount.type,
            url: foundAccount.url,
            username: foundAccount.username,
            password: foundAccount.password,
            projectId: foundAccount.projectId ? foundAccount.projectId.toString() : "",
            expiryDate: foundAccount.expiryDate || "",
            notes: foundAccount.notes || "",
            savePassword: true,
          });
        }
      } catch (error) {
        console.error("Error fetching account:", error);
        toast({
          title: "Error",
          description: "Failed to load account details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchAccountData();
    } else {
      // If no accountId, we're creating a new account
      setLoading(false);
    }
  }, [accountId, form]);

  // Form submission handler
  const onSubmit = (data: AccountFormValues) => {
    console.log("Form submitted:", data);
    
    // In a real app, you would send this to an API
    toast({
      title: "Success",
      description: `Account ${accountId ? "updated" : "created"} successfully`,
    });
    
    // Navigate back to accounts list
    navigate("/accounts");
  };

  // Function to get icon based on account type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'domain':
        return <Globe className="h-5 w-5" />;
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'service':
        return <AtSign className="h-5 w-5" />;
      default:
        return <Bookmark className="h-5 w-5" />;
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Copy to clipboard function
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${type} has been copied to your clipboard.`,
    });
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
      // In a real app, you would call an API to delete the account
      toast({
        title: "Account deleted",
        description: "The account has been removed from the system.",
      });
      navigate("/accounts");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" className="mr-2" onClick={() => navigate("/accounts")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {accountId ? "Account Details" : "Create New Account"}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Manage the account details and credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Project Website" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {accountTypes.map(type => (
                              <SelectItem key={type.id} value={type.id}>
                                <div className="flex items-center">
                                  {getTypeIcon(type.id)}
                                  <span className="ml-2">{type.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL / Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        The URL where this account is hosted or accessed
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username / Email</FormLabel>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Input placeholder="username@example.com" {...field} />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(field.value, "Username")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(field.value, "Password")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="savePassword"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Save Password</FormLabel>
                        <FormDescription>
                          Store password securely in the vault. Passwords are encrypted at rest.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Associated Project</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a project (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {projects.map(project => (
                            <SelectItem key={project.id} value={project.id.toString()}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Link this account to a specific project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </div>
                      <FormDescription>
                        When this account or subscription needs to be renewed
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional information about this account..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Any important details or context about this account
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className={accountId ? "" : "invisible"}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                  
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    {accountId ? "Update Account" : "Create Account"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accountId && (
                  <>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Last updated</p>
                      <p className="font-medium">2 days ago</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Created by</p>
                      <p className="font-medium">John Doe</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Last accessed</p>
                      <p className="font-medium">Today at 10:45 AM</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Access count</p>
                      <p className="font-medium">12 times</p>
                    </div>
                  </>
                )}
                {!accountId && (
                  <p className="text-muted-foreground">
                    Activity log will be available after the account is created.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Resources</CardTitle>
            </CardHeader>
            <CardContent>
              {accountId && account?.projectId ? (
                <div className="space-y-2">
                  <Link to={`/projects/${account.projectId}`} className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Bookmark className="mr-2 h-4 w-4" />
                      View Project: {account.projectName}
                    </Button>
                  </Link>
                  <a href={account.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="mr-2 h-4 w-4" />
                      Visit {account.name}
                    </Button>
                  </a>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {accountId ? 
                    "No related resources found." : 
                    "Related resources will be available after the account is created."
                  }
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
