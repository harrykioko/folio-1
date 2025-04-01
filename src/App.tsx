
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import { ThemeProvider } from "next-themes";
import { AppearanceProvider } from "./components/settings/AppearanceContext";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Accounts from "./pages/Accounts";
import AccountDetails from "./pages/AccountDetails";
import Prompts from "./pages/Prompts";
import PromptDetails from "./pages/PromptDetails";
import NewPrompt from "./pages/NewPrompt";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Workspace from "./pages/Workspace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system">
          <AppearanceProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                
                {/* App Routes - Protected by RequireAuth */}
                <Route element={<RequireAuth><AppLayout /></RequireAuth>}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  
                  {/* Project details routes - Order matters! Put specific routes first */}
                  <Route path="/projects/new" element={<ProjectDetails />} />
                  <Route path="/projects/:projectId" element={<ProjectDetails />} />
                  
                  {/* Tasks routes */}
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/tasks/new" element={<TaskDetails />} />
                  <Route path="/tasks/:taskId" element={<TaskDetails />} />
                  
                  <Route path="/accounts" element={<Accounts />} />
                  
                  {/* Prompts routes */}
                  <Route path="/prompts" element={<Prompts />} />
                  <Route path="/prompts/new" element={<NewPrompt />} />
                  <Route path="/prompts/:promptId" element={<PromptDetails />} />
                  
                  {/* Workspace route */}
                  <Route path="/workspace" element={<Workspace />} />
                  
                  {/* Team page */}
                  <Route path="/team" element={<Dashboard />} />
                  
                  {/* Settings page */}
                  <Route path="/settings" element={<Settings />} />
                  
                  {/* Account details routes */}
                  <Route path="/accounts/new" element={<AccountDetails />} />
                  <Route path="/accounts/:accountId" element={<AccountDetails />} />
                </Route>
                
                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AppearanceProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
