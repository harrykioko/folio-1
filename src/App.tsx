
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Accounts from "./pages/Accounts";
import AccountDetails from "./pages/AccountDetails";
import Prompts from "./pages/Prompts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* App Routes - Protected by AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            
            {/* Project details routes - Order matters! Put specific routes first */}
            <Route path="/projects/new" element={<ProjectDetails />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/prompts" element={<Prompts />} />
            
            {/* Placeholder routes for future implementation */}
            <Route path="/tasks" element={<Dashboard />} />
            <Route path="/messages" element={<Dashboard />} />
            <Route path="/team" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
            
            {/* Account details routes */}
            <Route path="/accounts/new" element={<AccountDetails />} />
            <Route path="/accounts/:accountId" element={<AccountDetails />} />
            
            {/* Prompt details routes */}
            <Route path="/prompts/new" element={<Prompts />} />
            <Route path="/prompts/:promptId" element={<Prompts />} />
            <Route path="/prompts/:promptId/edit" element={<Prompts />} />
          </Route>
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
