
import React from "react";
import { 
  BarChart2, 
  CheckSquare, 
  FolderGit, 
  KeySquare, 
  Lightbulb,
  Calendar 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SearchResult } from "@/services/searchService";

interface SearchResultPreviewProps {
  result: SearchResult;
}

const SearchResultPreview: React.FC<SearchResultPreviewProps> = ({ result }) => {
  switch (result.type) {
    case 'page':
      return (
        <div className="flex items-center">
          {result.icon}
          <span className="ml-2">{result.title}</span>
        </div>
      );
    
    case 'project':
      return (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FolderGit className="h-4 w-4 mr-2 text-primary" />
              <span>{result.title}</span>
            </div>
            {result.status && (
              <Badge variant="outline" className="ml-2">{result.status}</Badge>
            )}
          </div>
          {result.description && (
            <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
          )}
          {typeof result.progress === 'number' && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{result.progress}%</span>
              </div>
              <Progress value={result.progress} className="h-1.5" />
            </div>
          )}
        </div>
      );
    
    case 'task':
      return (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckSquare className="h-4 w-4 mr-2 text-primary" />
              <span>{result.title}</span>
            </div>
            {result.status && (
              <Badge variant={
                result.status === 'Completed' ? 'default' : 
                result.status === 'In Progress' ? 'secondary' : 
                'outline'
              } className="ml-2">
                {result.status}
              </Badge>
            )}
          </div>
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            {result.description && <span className="mr-2">{result.description}</span>}
            {result.dueDate && (
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {result.dueDate}
              </span>
            )}
          </div>
        </div>
      );
    
    case 'prompt':
      return (
        <div className="flex flex-col">
          <div className="flex items-center">
            <Lightbulb className="h-4 w-4 mr-2 text-primary" />
            <span>{result.title}</span>
          </div>
          {result.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{result.description}</p>
          )}
          {result.tags && result.tags.length > 0 && (
            <div className="flex gap-1 mt-1">
              {result.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      );
    
    case 'account':
      return (
        <div className="flex items-center">
          <KeySquare className="h-4 w-4 mr-2 text-primary" />
          <span>{result.title}</span>
          {result.description && (
            <span className="text-xs text-muted-foreground ml-2">({result.description})</span>
          )}
        </div>
      );
    
    case 'action':
      return (
        <div className="flex items-center">
          {result.icon}
          <span className="ml-2">{result.title}</span>
        </div>
      );
    
    default:
      return <span>{result.title}</span>;
  }
};

export default SearchResultPreview;
