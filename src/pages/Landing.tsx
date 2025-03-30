import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Command, Zap } from "lucide-react";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-landing-image bg-cover bg-center font-inter relative overflow-hidden">
      {/* Animated overlay elements - keeping stars and glowing elements */}
      <div className="absolute inset-0 overflow-hidden bg-black/30">
        <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-blue-400 opacity-60 animate-pulse-glow"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 rounded-full bg-indigo-400 opacity-70 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/5 w-2 h-2 rounded-full bg-purple-400 opacity-60 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-blue-500 opacity-70 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Orbit elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-96 w-96 border border-blue-500/10 rounded-full flex items-center justify-center">
            <div className="h-60 w-60 border border-indigo-500/10 rounded-full flex items-center justify-center">
              <div className="h-40 w-40 border border-purple-500/10 rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full animate-orbit"></div>
          <div className="absolute top-1/4 right-0 w-2 h-2 bg-indigo-400 rounded-full animate-orbit" style={{ animationDelay: '2s', animationDuration: '20s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-2 h-2 bg-purple-500 rounded-full animate-orbit" style={{ animationDelay: '1s', animationDuration: '12s' }}></div>
        </div>
      </div>

      {/* Header */}
      <header className="container z-10 pt-6 px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-primary-foreground mr-2"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            <span className="text-2xl font-bold tracking-tight text-white">Folio</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary text-white hover:bg-primary/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 px-4">
        <div className="max-w-3xl text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Folio</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            Your command center for building products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg h-auto" size="lg">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg h-auto" size="lg">
                Sign In <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container py-6 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
          <div className="mb-4 md:mb-0">
            © 2023 Folio. Internal use only.
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs">
            <Command className="h-3.5 w-3.5" />
            <span>Press <kbd className="px-1.5 py-0.5 bg-black/30 rounded text-xs">⌘K</kbd> anywhere to search</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
