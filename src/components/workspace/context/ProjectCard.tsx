
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Calendar, Users, Globe } from "lucide-react";

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
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
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
        
        <div className="grid grid-cols-2 gap-2 mt-6">
          <Button
            className="flex items-center justify-center"
            variant="default"
            size="sm"
          >
            View Details
          </Button>
          <Button
            className="flex items-center justify-center"
            variant="outline"
            size="sm"
          >
            Remove Context
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
