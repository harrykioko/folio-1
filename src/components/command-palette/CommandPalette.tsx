
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandInput, 
  CommandList, 
} from "@/components/ui/command";
import { AnimatePresence, motion } from "framer-motion";
import { DialogTitle } from "@/components/ui/dialog";
import { SearchResult } from "@/services/searchService";
import SearchGroup from "./SearchGroup";
import { useSearchResults } from "./useSearchResults";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { loading, results } = useSearchResults({ open, query });

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange, open]);

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const handleResultSelect = (result: SearchResult) => {
    onOpenChange(false);
    
    if (result.actionHandler) {
      result.actionHandler();
      return;
    }
    
    if (result.route) {
      navigate(result.route);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">Search</DialogTitle>
      <CommandInput 
        placeholder="Search pages, projects, tasks, prompts..." 
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[70vh]">
        <AnimatePresence>
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-6 text-center text-sm"
            >
              Searching...
            </motion.div>
          ) : (
            <>
              <CommandEmpty>No results found. Try a different search term.</CommandEmpty>
              
              <SearchGroup 
                heading="Pages" 
                results={results.pages} 
                onSelect={handleResultSelect} 
                showSeparator={false}
              />
              
              <SearchGroup 
                heading="Actions" 
                results={results.actions} 
                onSelect={handleResultSelect} 
              />
              
              <SearchGroup 
                heading="Projects" 
                results={results.projects} 
                onSelect={handleResultSelect} 
              />
              
              <SearchGroup 
                heading="Tasks" 
                results={results.tasks} 
                onSelect={handleResultSelect} 
              />
              
              <SearchGroup 
                heading="Prompts" 
                results={results.prompts} 
                onSelect={handleResultSelect} 
              />
              
              <SearchGroup 
                heading="Accounts" 
                results={results.accounts} 
                onSelect={handleResultSelect} 
              />
            </>
          )}
        </AnimatePresence>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
