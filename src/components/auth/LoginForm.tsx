
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user } = useAuth();

  // Get the intended destination
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  // If user is already logged in, redirect them
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error("Login error:", error);
        setLoginError(error.message || "Failed to sign in");
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message || "Invalid email or password",
        });
      } else {
        // On successful login
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        // The navigation is now handled in AuthContext
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("An unexpected error occurred");
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg backdrop-blur-xl bg-black/30 border border-white/10 text-white animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
        <CardDescription className="text-center text-white/70">
          Enter your credentials to access the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {loginError && (
            <div className="p-3 bg-destructive/20 border border-destructive/50 rounded-md text-sm text-destructive-foreground">
              {loginError}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-white/70" />
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Button variant="link" className="px-0 text-xs text-white/70 hover:text-white" type="button">
                Forgot password?
              </Button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-white/70" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-white/60">
          Don't have an account? <a href="/signup" className="text-primary hover:text-primary/90 underline">Create account</a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
