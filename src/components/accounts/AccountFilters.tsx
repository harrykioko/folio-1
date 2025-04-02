
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
  CalendarClock,
  Hash
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { accountTypes, socialPlatforms } from "@/utils/accountUtils";
import { projects } from "@/utils/projectData";
import type { AccountFilters } from "./useAccountFiltering";

interface AccountFiltersProps {
  filters: AccountFilters;
  setFilters: React.Dispatch<React.SetStateAction<AccountFilters>>;
  activeFiltersCount: number;
}

const AccountFilters: React.FC<AccountFiltersProps> = ({ 
  filters, 
  setFilters,
  activeFiltersCount
}) => {
  const handleReset = () => {
    setFilters({
      type: "",
      platform: "",
      projectId: "",
      expiryStatus: ""
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
              value={filters.type || "all-types"}
              onValueChange={(value) => setFilters(prev => ({ 
                ...prev, 
                type: value === "all-types" ? "" : value,
                // Reset platform when changing type
                platform: value !== "SocialMedia" ? "" : prev.platform 
              }))}
            >
              <SelectTrigger id="type-filter">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all-types">All types</SelectItem>
                  {accountTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Social Media Platform filter - only show when type is SocialMedia */}
          {filters.type === "SocialMedia" && (
            <div className="space-y-2">
              <Label htmlFor="platform-filter">Platform</Label>
              <Select
                value={filters.platform || "all-platforms"}
                onValueChange={(value) => setFilters(prev => ({ 
                  ...prev, 
                  platform: value === "all-platforms" ? "" : value 
                }))}
              >
                <SelectTrigger id="platform-filter">
                  <SelectValue placeholder="All platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-platforms">All platforms</SelectItem>
                    {socialPlatforms.map((platform) => (
                      <SelectItem key={platform.id} value={platform.id}>{platform.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="project-filter">Project</Label>
            <Select
              value={filters.projectId || "all-projects"}
              onValueChange={(value) => setFilters(prev => ({ ...prev, projectId: value === "all-projects" ? "" : value }))}
            >
              <SelectTrigger id="project-filter">
                <SelectValue placeholder="All projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all-projects">All projects</SelectItem>
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
              value={filters.expiryStatus || "all-statuses"}
              onValueChange={(value) => setFilters(prev => ({ ...prev, expiryStatus: value === "all-statuses" ? "" : value }))}
            >
              <SelectTrigger id="expiry-filter">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all-statuses">All statuses</SelectItem>
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
