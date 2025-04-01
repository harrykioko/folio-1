
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const SignUp: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col bg-landing-image bg-cover bg-center font-inter relative overflow-hidden"
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 overflow-hidden bg-black/30">
        <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-blue-400 opacity-60 animate-pulse-glow"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 rounded-full bg-indigo-400 opacity-70 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/5 w-2 h-2 rounded-full bg-purple-400 opacity-60 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        
        {/* Subtle orbit */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-96 w-96 border border-blue-500/10 rounded-full"></div>
        </div>
      </div>

      {/* Back to home link */}
      <div className="container pt-6 z-10">
        <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md text-center mb-8">
          <div className="inline-flex items-center justify-center bg-primary/10 backdrop-blur-md p-3 rounded-2xl mb-6 border border-white/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-white"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Invite Only Access</h1>
          <p className="text-lg text-white/70 mt-2">
            Folio is currently invite-only
          </p>
        </div>
        
        <Card className="w-full max-w-md shadow-lg backdrop-blur-xl bg-black/30 border border-white/10 text-white animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Restricted Registration</CardTitle>
            <CardDescription className="text-center text-white/70">
              Folio uses an invite-only registration system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-center">
              <p className="text-white/80">
                New user accounts can only be created by administrators through the invitation system.
              </p>
              <p className="text-white/80">
                If you received an invitation email, please check your inbox for a link to set your password and activate your account.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-white/60">
              Already have an account? <Link to="/login" className="text-primary hover:text-primary/90 underline">Sign in</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
