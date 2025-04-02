
import React from "react";
import { Project } from "@/utils/supabaseProjects";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  Activity, 
  MessageSquare, 
  Users,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import OverviewTab from "../OverviewTab";
import TasksTab from "../TasksTab";
import AccountsTab from "../AccountsTab";
import PromptsTab from "../PromptsTab";
import ActivityTab from "../ActivityTab";
import ProjectKanban from "../kanban/ProjectKanban";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ProjectMainContentProps {
  project: Project;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProjectMainContent: React.FC<ProjectMainContentProps> = ({
  project,
  activeTab,
  setActiveTab
}) => {
  // Placeholder metrics data
  const metrics = [
    { 
      id: "visits", 
      name: "Site Visits", 
      value: "1,278", 
      change: "+12.3%", 
      isPositive: true,
      icon: <TrendingUp className="w-5 h-5 text-green-500" />
    },
    { 
      id: "followers", 
      name: "Social Followers", 
      value: "856", 
      change: "+24.8%", 
      isPositive: true,
      icon: <Users className="w-5 h-5 text-blue-500" />
    },
    { 
      id: "revenue", 
      name: "Stripe Revenue", 
      value: "$5,204", 
      change: "-2.1%", 
      isPositive: false,
      icon: <TrendingDown className="w-5 h-5 text-red-500" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.id} className="backdrop-blur-md bg-white/5 p-4 border border-white/10 shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{metric.name}</h3>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
                <div className={`flex items-center mt-1 ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  <span className="text-xs font-medium">{metric.change}</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-background">
                {metric.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Task Kanban View */}
      <Card className="backdrop-blur-md bg-white/5 p-6 border border-white/10 shadow-lg rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <Button variant="outline" size="sm" className="text-xs">
            View All
          </Button>
        </div>
        <ProjectKanban projectId={project.id} />
      </Card>
      
      {/* Comments Section */}
      <Card className="backdrop-blur-md bg-white/5 p-6 border border-white/10 shadow-lg rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Comments
          </h2>
          <span className="text-xs text-muted-foreground">3 comments</span>
        </div>
        
        <div className="mb-4">
          <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                JD
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
                <p className="text-sm mt-1">The milestones look good, but I think we should add a beta testing phase before the MVP launch.</p>
              </div>
            </div>
          </div>
          
          <div className="border-l-2 border-gray-200 pl-4 py-2">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-medium">
                SM
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Sarah Miller</span>
                  <span className="text-xs text-muted-foreground">Yesterday</span>
                </div>
                <p className="text-sm mt-1">Great progress on the social media accounts. We're seeing good traction already!</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Textarea 
            placeholder="Leave a comment... Use @ to tag teammates" 
            className="min-h-[80px] bg-background/50"
          />
          <div className="flex justify-end mt-2">
            <Button size="sm">Post Comment</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectMainContent;
