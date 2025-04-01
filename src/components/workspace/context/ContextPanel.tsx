
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
import { ProjectCard } from "./ProjectCard";
import { SuggestedCard } from "./SuggestedCard";
import { PromptCard } from "./PromptCard";
import { EmptyContextState } from "./EmptyContextState";
import { getProjectById, projects } from "@/utils/projectUtils";

export const ContextPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("context");
  const [hasActiveContext, setHasActiveContext] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);
  
  const handleActionClick = (action: string) => {
    console.log(action);
    // In a real implementation, this would trigger context changes
    // For demo purposes, we'll set hasActiveContext to true to show the transition
    setHasActiveContext(true);
  };

  const handleProjectSelect = (projectId: number) => {
    const project = getProjectById(projectId);
    if (project) {
      setActiveProject(project);
      setHasActiveContext(true);
    }
  };

  return (
    <motion.div 
      className="w-full md:w-3/5 h-full flex flex-col rounded-lg shadow-lg bg-card overflow-hidden"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="p-4 border-b">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/workspace">Workspace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {activeProject ? activeProject.name : "Current Context"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {hasActiveContext && (
          <Tabs defaultValue={activeTab} className="mt-2" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="context">Context</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="output">AI Output</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
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
              
              {activeTab === "context" && !activeProject && (
                <ProjectCard 
                  title="Harvest on Hudson"
                  description="Farm-to-table restaurant with scenic river views"
                  image="/lovable-uploads/79a1aa49-c50d-4339-863a-b36ea808f6d0.png"
                  stats={[
                    { label: "Rating", value: "4.3" },
                    { label: "Category", value: "Restaurant" },
                    { label: "Location", value: "Hastings, NY" }
                  ]}
                  tags={["Italian", "Seafood", "River View"]}
                />
              )}
              
              {activeTab === "suggestions" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SuggestedCard 
                    title="Create Task"
                    description="Add a new task for the Harvest website update"
                    icon="ListTodo"
                  />
                  <SuggestedCard 
                    title="Draft Prompt"
                    description="Create a prompt template for menu descriptions"
                    icon="FileText"
                  />
                  <SuggestedCard 
                    title="Add Account"
                    description="Store credentials for social media profiles"
                    icon="KeyRound"
                  />
                  <SuggestedCard 
                    title="View Timeline"
                    description="Check project milestones and deadlines"
                    icon="Calendar"
                  />
                </div>
              )}
              
              {activeTab === "output" && (
                <PromptCard 
                  title="Welcome Email Generator"
                  description="Creates personalized welcome emails for new restaurant guests"
                  content="Dear [Guest Name],\n\nThank you for dining with us at Harvest on Hudson! We hope you enjoyed the seasonal cuisine and riverside views during your recent visit.\n\nAs a token of our appreciation, we'd like to offer you a complimentary dessert on your next visit. Simply mention this email to your server.\n\nWe look forward to serving you again soon!\n\nWarmly,\nThe Harvest on Hudson Team"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
