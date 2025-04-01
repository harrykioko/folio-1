
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Send } from "lucide-react";

type PromptCardProps = {
  title: string;
  description: string;
  content: string;
};

export const PromptCard: React.FC<PromptCardProps> = ({
  title,
  description,
  content,
}) => {
  const [outputContent, setOutputContent] = useState(content);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(outputContent);
    console.log("Copied to clipboard");
  };
  
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([outputContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea 
          value={outputContent}
          onChange={(e) => setOutputContent(e.target.value)}
          className="min-h-[200px] font-mono text-sm"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
        <Button size="sm">
          <Send className="h-4 w-4 mr-2" />
          Use
        </Button>
      </CardFooter>
    </Card>
  );
};
