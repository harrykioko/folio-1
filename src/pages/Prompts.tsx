import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Tag,
  Download,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Sparkles,
  Lightbulb,
  Code,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { getPrompts, copyPromptToClipboard } from "@/utils/promptUtils";

const Prompts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const promptsData = getPrompts();
  const allCategories = Array.from(new Set(promptsData.map(p => p.category)));
  const allTags = Array.from(new Set(promptsData.flatMap(p => p.tags)));

  const filteredPrompts = promptsData.filter(prompt => {
    // Search filter
    const matchesSearch = 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (prompt.projectName && prompt.projectName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = !selectedCategory || prompt.category === selectedCategory;
    
    // Tags filter
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => prompt.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Prompt Library</h1>
        <Button asChild>
          <Link to="/prompts/new">
            <Plus className="mr-2 h-4 w-4" />
            New Prompt
          </Link>
        </Button>
      </div>

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

      <Tabs defaultValue="grid" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export Library
          </Button>
        </div>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrompts.map((prompt) => (
              <Card key={prompt.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base line-clamp-1">{prompt.title}</CardTitle>
                    <Badge variant="secondary">{prompt.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{prompt.description}</p>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {prompt.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span>Effectiveness: {prompt.effectiveness}</span>
                    </div>
                    {prompt.projectName && (
                      <Link to={`/projects/${prompt.projectId}`} className="text-primary hover:underline text-xs">
                        {prompt.projectName}
                      </Link>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground"
                    onClick={() => copyPromptToClipboard(prompt.prompt)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/prompts/${prompt.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {filteredPrompts.length === 0 && (
            <div className="text-center py-10">
              <Lightbulb className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No prompts found matching your search or filters</p>
              <Button variant="link" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="list">
          <Card>
            {filteredPrompts.length === 0 ? (
              <div className="text-center py-10">
                <Lightbulb className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No prompts found matching your search or filters</p>
                <Button variant="link" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              filteredPrompts.map((prompt, index) => (
                <React.Fragment key={prompt.id}>
                  {index > 0 && <div className="border-t mx-4"></div>}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{prompt.title}</h3>
                          <Badge variant="secondary">{prompt.category}</Badge>
                          <Badge 
                            variant={
                              prompt.effectiveness === "High" ? "default" : 
                              prompt.effectiveness === "Medium" ? "outline" : "secondary"
                            }
                            className="flex items-center gap-1"
                          >
                            <Sparkles className="h-3 w-3" />
                            {prompt.effectiveness}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{prompt.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {prompt.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => copyPromptToClipboard(prompt.prompt)}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/prompts/${prompt.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/prompts/${prompt.id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => copyPromptToClipboard(prompt.prompt)}>
                              Copy Prompt
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Export as JSON
                            </DropdownMenuItem>
                            {prompt.projectName && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link to={`/projects/${prompt.projectId}`}>
                                    Go to Project: {prompt.projectName}
                                  </Link>
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="mt-3 bg-secondary/50 rounded-md p-3 text-sm font-mono relative">
                      <Code className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <p className="pr-6 line-clamp-2">{prompt.prompt}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Prompts;
