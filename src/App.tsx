
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Accounts from "./pages/Accounts";
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
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* App Routes - Protected by AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/prompts" element={<Prompts />} />
            
            {/* Placeholder routes for future implementation */}
            <Route path="/tasks" element={<Dashboard />} />
            <Route path="/messages" element={<Dashboard />} />
            <Route path="/team" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
            
            {/* Project details routes */}
            <Route path="/projects/:projectId" element={<Projects />} />
            <Route path="/projects/new" element={<Projects />} />
            
            {/* Account details routes */}
            <Route path="/accounts/:accountId" element={<Accounts />} />
            <Route path="/accounts/new" element={<Accounts />} />
            <Route path="/accounts/:accountId/edit" element={<Accounts />} />
            
            {/* Prompt details routes */}
            <Route path="/prompts/:promptId" element={<Prompts />} />
            <Route path="/prompts/new" element={<Prompts />} />
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
