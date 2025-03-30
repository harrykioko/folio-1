
import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "@/components/auth/SignUpForm";
import { ArrowLeft } from "lucide-react";

const SignUp: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col bg-landing-gradient font-inter relative overflow-hidden"
    >
      {/* Animated background elements - simplified version of landing page */}
      <div className="absolute inset-0 overflow-hidden">
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
          <h1 className="text-3xl font-bold tracking-tight text-white">Join Folio</h1>
          <p className="text-lg text-white/70 mt-2">
            Create your account to get started
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
