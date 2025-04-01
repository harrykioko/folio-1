
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  SlidersHorizontal, 
  X,
  CalendarClock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { accountTypes, projects } from "@/utils/accountUtils";

interface AccountFiltersProps {
  filters: {
    type: string | null;
    projectId: string | null;
    expiryStatus: string | null;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    type: string | null;
    projectId: string | null;
    expiryStatus: string | null;
  }>>;
  activeFiltersCount: number;
}

const AccountFilters: React.FC<AccountFiltersProps> = ({ 
  filters, 
  setFilters,
  activeFiltersCount
}) => {
  const handleReset = () => {
    setFilters({
      type: null,
      projectId: null,
      expiryStatus: null
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 px-1.5 py-0.5 h-5 min-w-5 flex items-center justify-center"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Filter Accounts</h4>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleReset}
            className="h-8 px-2 text-xs"
          >
            Reset
            <X className="ml-1 h-3 w-3" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type-filter">Account Type</Label>
            <Select
              value={filters.type || ""}
              onValueChange={(value) => setFilters(prev => ({ ...prev, type: value || null }))}
            >
              <SelectTrigger id="type-filter">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">All types</SelectItem>
                  {accountTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="project-filter">Project</Label>
            <Select
              value={filters.projectId || ""}
              onValueChange={(value) => setFilters(prev => ({ ...prev, projectId: value || null }))}
            >
              <SelectTrigger id="project-filter">
                <SelectValue placeholder="All projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">All projects</SelectItem>
                  <SelectItem value="none">No project</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiry-filter" className="flex items-center gap-1">
              <CalendarClock className="h-4 w-4" />
              Expiry Status
            </Label>
            <Select
              value={filters.expiryStatus || ""}
              onValueChange={(value) => setFilters(prev => ({ ...prev, expiryStatus: value || null }))}
            >
              <SelectTrigger id="expiry-filter">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="expiring-soon">Expiring Soon (30 days)</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="no-expiry">No Expiry Date</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccountFilters;
