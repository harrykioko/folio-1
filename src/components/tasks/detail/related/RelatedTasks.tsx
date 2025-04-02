
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useRelatedTasks } from "@/hooks/useRelatedTasks";
import RelatedTasksList from "./RelatedTasksList";
import LinkTaskModal from "./LinkTaskModal";

interface RelatedTasksProps {
  taskId: number;
}

const RelatedTasks: React.FC<RelatedTasksProps> = ({ taskId }) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const { 
    relatedTasks, 
    isLoading, 
    error, 
    linkTask, 
    unlinkTask 
  } = useRelatedTasks(taskId);
  
  const handleOpenLinkModal = () => {
    setIsLinkModalOpen(true);
  };
  
  const handleLinkTask = async (relatedTaskId: number) => {
    return await linkTask(relatedTaskId);
  };
  
  const handleUnlinkTask = async (relatedTaskId: number) => {
    return await unlinkTask(relatedTaskId);
  };
  
  return (
    <>
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Related Tasks</h3>
        <RelatedTasksList 
          tasks={relatedTasks}
          isLoading={isLoading}
          error={error}
          onUnlink={handleUnlinkTask}
          onOpenLinkModal={handleOpenLinkModal}
        />
      </Card>
      
      <LinkTaskModal 
        open={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        onLinkTask={handleLinkTask}
        currentTaskId={taskId}
        alreadyLinkedTaskIds={relatedTasks.map(task => task.id)}
      />
    </>
  );
};

export default RelatedTasks;
