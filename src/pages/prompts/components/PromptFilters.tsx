
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PromptFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  allCategories: string[];
  allTags: string[];
}

const PromptFilters: React.FC<PromptFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTags,
  toggleTag,
  clearFilters,
  allCategories,
  allTags,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search prompts..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="shrink-0">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {(selectedCategory || selectedTags.length > 0) && (
              <Badge variant="secondary" className="ml-2 px-1 py-0 h-5">
                {(selectedCategory ? 1 : 0) + selectedTags.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <div className="p-2">
            <p className="text-sm font-medium mb-2">Categories</p>
            <div className="space-y-1">
              {allCategories.map(category => (
                <div key={category} className="flex items-center">
                  <Button
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-sm"
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  >
                    {category}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          {allTags.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
          <DropdownMenuSeparator />
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center text-sm"
            onClick={clearFilters}
            disabled={!selectedCategory && selectedTags.length === 0}
          >
            Clear Filters
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PromptFilters;
