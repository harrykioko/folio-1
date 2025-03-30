
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const Login: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-accent/20"
    >
      <div className="w-full max-w-md text-center mb-8">
        <div className="inline-flex items-center justify-center bg-primary p-2 rounded-lg mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-primary-foreground"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Folio</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Internal SaaS Management Platform
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
