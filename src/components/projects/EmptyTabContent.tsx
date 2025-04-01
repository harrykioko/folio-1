
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface EmptyTabContentProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  onButtonClick?: () => void;
}

const EmptyTabContent: React.FC<EmptyTabContentProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  onButtonClick,
}) => {
  const buttonProps = buttonLink 
    ? { asChild: true } 
    : { onClick: onButtonClick };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Button asChild>
            <a href={buttonLink}>
              <Plus className="mr-2 h-4 w-4" />
              {buttonText}
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-10 text-muted-foreground">
          <p>{description}</p>
          <Button variant="outline" className="mt-4" {...buttonProps}>
            {buttonLink ? (
              <a href={buttonLink}>
                <Plus className="mr-2 h-4 w-4" />
                {buttonText}
              </a>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                {buttonText}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyTabContent;
