
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import PromptGridView from "./PromptGridView";
import PromptListView from "./PromptListView";
import { Prompt } from "@/utils/prompts/types";

interface PromptTabsProps {
  prompts: Prompt[];
  allPrompts: number;
}

const PromptTabs: React.FC<PromptTabsProps> = ({ prompts, allPrompts }) => {
  return (
    <Tabs defaultValue="grid" className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        {allPrompts > 0 && (
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export Library
          </Button>
        )}
      </div>

      <TabsContent value="grid" className="space-y-4">
        <PromptGridView prompts={prompts} />
      </TabsContent>

      <TabsContent value="list">
        <PromptListView prompts={prompts} />
      </TabsContent>
    </Tabs>
  );
};

export default PromptTabs;
