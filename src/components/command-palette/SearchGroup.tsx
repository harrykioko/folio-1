
import React from "react";
import { CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";
import { SearchResult } from "@/services/searchService";
import SearchResultPreview from "./SearchResultPreview";

interface SearchGroupProps {
  heading: string;
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
  showSeparator?: boolean;
}

const SearchGroup: React.FC<SearchGroupProps> = ({ 
  heading, 
  results, 
  onSelect, 
  showSeparator = true 
}) => {
  if (results.length === 0) return null;

  return (
    <>
      {showSeparator && <CommandSeparator />}
      <CommandGroup heading={heading}>
        {results.map((result) => (
          <CommandItem
            key={`${result.type}-${result.id}`}
            onSelect={() => onSelect(result)}
            className={result.type === 'page' || result.type === 'action' ? "flex items-center" : "py-2"}
          >
            <SearchResultPreview result={result} />
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
};

export default SearchGroup;
