
import React from "react";
import { Project } from "@/utils/projects";
import { 
  CheckCircle2, 
  Globe, 
  Brush, 
  Share2, 
  Calendar, 
  Rocket, 
  Code, 
  User, 
  DollarSign 
} from "lucide-react";

interface ProjectMilestonesProps {
  project: Project;
}

const ProjectMilestones: React.FC<ProjectMilestonesProps> = ({ project }) => {
  // Define milestones with progress indicators
  const milestones = [
    { 
      id: 1, 
      name: "Finalize name", 
      icon: <CheckCircle2 className="h-4 w-4" />, 
      isCompleted: true 
    },
    { 
      id: 2, 
      name: "Buy domain", 
      icon: <Globe className="h-4 w-4" />, 
      isCompleted: project.domains && project.domains.length > 0 
    },
    { 
      id: 3, 
      name: "Establish brand", 
      icon: <Brush className="h-4 w-4" />, 
      isCompleted: false 
    },
    { 
      id: 4, 
      name: "Launch socials", 
      icon: <Share2 className="h-4 w-4" />, 
      isCompleted: project.social && project.social.length > 0 
    },
    { 
      id: 5, 
      name: "Build calendar", 
      icon: <Calendar className="h-4 w-4" />, 
      isCompleted: false 
    },
    { 
      id: 6, 
      name: "Deploy marketing", 
      icon: <Share2 className="h-4 w-4" />, 
      isCompleted: false 
    },
    { 
      id: 7, 
      name: "Launch MVP", 
      icon: <Rocket className="h-4 w-4" />, 
      isCompleted: false 
    },
    { 
      id: 8, 
      name: "First paying user", 
      icon: <User className="h-4 w-4" />, 
      isCompleted: false 
    },
    { 
      id: 9, 
      name: "$10K MRR", 
      icon: <DollarSign className="h-4 w-4" />, 
      isCompleted: false 
    }
  ];

  // Calculate progress for the progress line
  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter(m => m.isCompleted).length;
  const progressPercentage = (completedMilestones / totalMilestones) * 100;

  return (
    <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg">
      <h3 className="text-lg font-semibold mb-6">Project Milestones</h3>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200">
          <div 
            className="absolute top-0 left-0 h-full bg-primary" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Milestone Dots */}
        <div className="flex justify-between relative">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                  ${milestone.isCompleted 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-500 border border-gray-200'}`}
              >
                {milestone.icon}
              </div>
              <span className="text-xs mt-2 text-center max-w-[60px]">{milestone.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectMilestones;
