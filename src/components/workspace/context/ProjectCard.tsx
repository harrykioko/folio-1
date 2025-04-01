
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Tag } from "lucide-react";

type Stat = {
  label: string;
  value: string;
};

type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  stats: Stat[];
  tags: string[];
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  stats,
  tags,
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-52 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge className="flex items-center">
            <Star className="h-3 w-3 mr-1 fill-current" />
            {stats.find(s => s.label === "Rating")?.value || "N/A"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span className="font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center mt-4 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>Hastings-on-Hudson, NY 10706</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
          >
            View Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
          >
            Add to Project
          </motion.button>
        </div>
      </CardContent>
    </Card>
  );
};
