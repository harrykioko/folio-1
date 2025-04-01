
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TeamCardProps {
  teamSize: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ teamSize }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Team</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex -space-x-2">
          {Array(teamSize).fill(0).map((_, i) => (
            <Avatar key={i} className="border-2 border-background">
              <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
            </Avatar>
          ))}
          <Button variant="outline" className="rounded-full h-10 w-10 ml-1" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
