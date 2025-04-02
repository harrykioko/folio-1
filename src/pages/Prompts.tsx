
import React, { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { fetchPrompts, Prompt } from "@/utils/supabasePrompts";
import { promptCategories, promptEffectiveness } from "@/components/prompts/constants";

const Prompts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        setLoading(true);
        const data = await fetchPrompts();
        setPrompts(data);
        setError(null);
      } catch (err) {
        console.error("Error loading prompts:", err);
        setError("Failed to load prompts");
        toast({
          title: "Error",
          description: "Failed to load prompts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPrompts();
  }, []);

  // Get unique categories and tags from the actual data
  const allCategories = Array.from(
    new Set(
      prompts.map(p => 
        // Map database content to a category based on keywords
        p.content.toLowerCase().includes("marketing") ? "Marketing" :
        p.content.toLowerCase().includes("development") ? "Development" :
        p.content.toLowerCase().includes("content") ? "Content" :
        p.content.toLowerCase().includes("social") ? "Social Media" :
        p.content.toLowerCase().includes("support") ? "Support" :
        "Other"
      )
    )
  );

  const allTags = Array.from(
    new Set(
      prompts.flatMap(p => p.tags || [])
    )
  );

  const filteredPrompts = prompts.filter(prompt => {
    // Calculate display category
    const promptCategory = 
      prompt.content.toLowerCase().includes("marketing") ? "Marketing" :
      prompt.content.toLowerCase().includes("development") ? "Development" :
      prompt.content.toLowerCase().includes("content") ? "Content" :
      prompt.content.toLowerCase().includes("social") ? "Social Media" :
      prompt.content.toLowerCase().includes("support") ? "Support" :
      "Other";
      
    // Search filter
    const matchesSearch = 
      (prompt.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prompt.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = !selectedCategory || promptCategory === selectedCategory;
    
    // Tags filter
    const matchesTags = selectedTags.length === 0 || 
      (prompt.tags && selectedTags.every(tag => prompt.tags.includes(tag)));
    
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

  const copyPromptToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Prompt content has been copied to your clipboard",
    });
  };

  if (loading) {
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
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
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
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Lightbulb className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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

      <Tabs defaultValue="grid" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          {prompts.length > 0 && (
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export Library
            </Button>
          )}
        </div>

        <TabsContent value="grid" className="space-y-4">
          {filteredPrompts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPrompts.map((prompt) => {
                // Calculate display category
                const promptCategory = 
                  prompt.content.toLowerCase().includes("marketing") ? "Marketing" :
                  prompt.content.toLowerCase().includes("development") ? "Development" :
                  prompt.content.toLowerCase().includes("content") ? "Content" :
                  prompt.content.toLowerCase().includes("social") ? "Social Media" :
                  prompt.content.toLowerCase().includes("support") ? "Support" :
                  "Other";
                  
                // Determine effectiveness based on content length or some other heuristic
                const promptEffectiveness = 
                  prompt.content.length > 500 ? "High" :
                  prompt.content.length > 200 ? "Medium" :
                  "Low";
                  
                return (
                  <Card key={prompt.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-base line-clamp-1">
                          {prompt.name || "Untitled Prompt"}
                        </CardTitle>
                        <Badge variant="secondary">{promptCategory}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {prompt.content.substring(0, 100)}...
                      </p>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(prompt.tags || []).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-4 w-4 text-amber-500" />
                          <span>Effectiveness: {promptEffectiveness}</span>
                        </div>
                        {prompt.project_id && (
                          <Link to={`/projects/${prompt.project_id}`} className="text-primary hover:underline text-xs">
                            Project #{prompt.project_id}
                          </Link>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground"
                        onClick={() => copyPromptToClipboard(prompt.content)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/prompts/${prompt.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
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
              filteredPrompts.map((prompt, index) => {
                // Calculate display category
                const promptCategory = 
                  prompt.content.toLowerCase().includes("marketing") ? "Marketing" :
                  prompt.content.toLowerCase().includes("development") ? "Development" :
                  prompt.content.toLowerCase().includes("content") ? "Content" :
                  prompt.content.toLowerCase().includes("social") ? "Social Media" :
                  prompt.content.toLowerCase().includes("support") ? "Support" :
                  "Other";
                  
                // Determine effectiveness based on content length or some other heuristic
                const promptEffectiveness = 
                  prompt.content.length > 500 ? "High" :
                  prompt.content.length > 200 ? "Medium" :
                  "Low";
                  
                return (
                  <React.Fragment key={prompt.id}>
                    {index > 0 && <div className="border-t mx-4"></div>}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{prompt.name || "Untitled Prompt"}</h3>
                            <Badge variant="secondary">{promptCategory}</Badge>
                            <Badge 
                              variant={
                                promptEffectiveness === "High" ? "default" : 
                                promptEffectiveness === "Medium" ? "outline" : "secondary"
                              }
                              className="flex items-center gap-1"
                            >
                              <Sparkles className="h-3 w-3" />
                              {promptEffectiveness}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{prompt.content.substring(0, 100)}...</p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {(prompt.tags || []).map(tag => (
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
                            onClick={() => copyPromptToClipboard(prompt.content)}
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
                              <DropdownMenuItem onClick={() => copyPromptToClipboard(prompt.content)}>
                                Copy Prompt
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Export as JSON
                              </DropdownMenuItem>
                              {prompt.project_id && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem asChild>
                                    <Link to={`/projects/${prompt.project_id}`}>
                                      Go to Project #{prompt.project_id}
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
                        <p className="pr-6 line-clamp-2">{prompt.content}</p>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Prompts;
