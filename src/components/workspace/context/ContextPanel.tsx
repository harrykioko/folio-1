
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { SuggestedCard } from "./SuggestedCard";
import { PromptCard } from "./PromptCard";
import { EmptyContextState } from "./EmptyContextState";
import { getProjectById, projects } from "@/utils/projectUtils";
import { getTaskById } from "@/utils/taskUtils";

export const ContextPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("context");
  const [hasActiveContext, setHasActiveContext] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);
  const [activeTask, setActiveTask] = useState<any>(null);
  const [activePrompt, setActivePrompt] = useState<any>(null);
  
  const handleActionClick = (action: string) => {
    console.log("Action clicked:", action);
    
    // Handle project-related actions
    if (action.includes("project summary")) {
      const projectName = action.split("the ")[1].split(" project")[0];
      const project = projects.find(p => p.name.toLowerCase().includes(projectName.toLowerCase()));
      if (project) {
        handleProjectSelect(project.id);
      }
    } 
    // Handle task-related actions
    else if (action.includes("task")) {
      setActiveProject(null);
      setActivePrompt(null);
      setActiveTask({
        title: "New Task",
        status: "To Do",
        priority: "Medium",
        assignee: "Unassigned",
        dueDate: "Not set"
      });
      setHasActiveContext(true);
    }
    // Handle prompt-related actions
    else if (action.includes("prompt")) {
      setActiveProject(null);
      setActiveTask(null);
      setActivePrompt({
        title: "Welcome Email Generator",
        description: "Creates personalized welcome emails for new users",
        content: "Write a welcome email for {{name}} who just signed up for {{service}}."
      });
      setHasActiveContext(true);
    }
    // Handle other actions
    else {
      setHasActiveContext(true);
    }
  };

  const handleProjectSelect = (projectId: number) => {
    const project = getProjectById(projectId);
    if (project) {
      setActiveProject(project);
      setActiveTask(null);
      setActivePrompt(null);
      setHasActiveContext(true);
    }
  };
  
  const handleClearContext = () => {
    setHasActiveContext(false);
    setActiveProject(null);
    setActiveTask(null);
    setActivePrompt(null);
  };

  return (
    <motion.div 
      className="w-full md:w-3/5 h-full flex flex-col rounded-lg shadow-lg bg-card overflow-hidden"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="p-4 border-b flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/workspace">Workspace</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {activeProject ? activeProject.name : 
                   activeTask ? "Task" : 
                   activePrompt ? "Prompt" : "Current Context"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {hasActiveContext && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearContext}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove Context</span>
            </Button>
          )}
        </div>
        
        <Tabs defaultValue={activeTab} className={hasActiveContext ? "mt-2" : "hidden"} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="context">Context</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="output">AI Output</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {!hasActiveContext ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyContextState 
                onActionClick={handleActionClick}
                onProjectSelect={handleProjectSelect}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {activeTab === "context" && activeProject && (
                <ProjectCard 
                  title={activeProject.name}
                  description={activeProject.description}
                  image="/lovable-uploads/79a1aa49-c50d-4339-863a-b36ea808f6d0.png"
                  stats={[
                    { label: "Progress", value: `${activeProject.progress}%` },
                    { label: "Team", value: activeProject.team.toString() },
                    { label: "Due Date", value: activeProject.dueDate }
                  ]}
                  tags={activeProject.domains.map((domain: string) => domain.split('.')[0])}
                />
              )}
              
              {activeTab === "context" && activeTask && (
                <div className="bg-card border rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{activeTask.title}</h3>
                    <p className="text-muted-foreground">{activeTask.description || "No description provided."}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">{activeTask.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Priority</p>
                      <p className="font-medium">{activeTask.priority}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Assignee</p>
                      <p className="font-medium">{activeTask.assignee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-medium">{activeTask.dueDate}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>View Task Details</Button>
                  </div>
                </div>
              )}
              
              {activeTab === "context" && activePrompt && (
                <PromptCard 
                  title={activePrompt.title}
                  description={activePrompt.description}
                  content={activePrompt.content}
                />
              )}
              
              {activeTab === "suggestions" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SuggestedCard 
                    title="Create Task"
                    description="Add a new task for the project"
                    icon="ListTodo"
                  />
                  <SuggestedCard 
                    title="Draft Prompt"
                    description="Create a prompt template"
                    icon="FileText"
                  />
                  <SuggestedCard 
                    title="Add Account"
                    description="Store credentials for accounts"
                    icon="KeyRound"
                  />
                  <SuggestedCard 
                    title="View Timeline"
                    description="Check project milestones and deadlines"
                    icon="Calendar"
                  />
                </div>
              )}
              
              {activeTab === "output" && activePrompt && (
                <PromptCard 
                  title={activePrompt.title}
                  description={activePrompt.description}
                  content={activePrompt.content}
                />
              )}
              
              {activeTab === "output" && !activePrompt && (
                <div className="bg-card border rounded-lg p-6 text-center">
                  <h3 className="text-lg font-medium mb-2">No AI Output Yet</h3>
                  <p className="text-muted-foreground">
                    Ask a question or request content generation to see AI output here.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
