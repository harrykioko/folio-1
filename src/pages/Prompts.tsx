
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

const promptsData = [
  {
    id: 1,
    title: "SEO Content Generator",
    category: "Content",
    description: "Generates SEO-optimized blog content based on keywords and topic",
    effectiveness: "High",
    dateCreated: "2023-08-15",
    projectId: 1,
    projectName: "Project Alpha",
    tags: ["content", "marketing", "seo"],
    prompt: "Write an SEO-optimized blog post about [TOPIC] that includes the following keywords: [KEYWORDS]. Structure the content with H2 and H3 headings, and include a compelling introduction and conclusion."
  },
  {
    id: 2,
    title: "Product Feature Summary",
    category: "Marketing",
    description: "Creates concise product feature summaries for marketing materials",
    effectiveness: "Medium",
    dateCreated: "2023-09-03",
    projectId: 2,
    projectName: "Dashboard X",
    tags: ["product", "features", "marketing"],
    prompt: "Create a concise summary of the following product feature: [FEATURE]. The summary should be no more than 3 sentences, highlight the key benefit, and be suitable for marketing materials."
  },
  {
    id: 3,
    title: "Customer Support Response Template",
    category: "Support",
    description: "Generates friendly customer support responses for common issues",
    effectiveness: "High",
    dateCreated: "2023-07-22",
    projectId: 3,
    projectName: "LMS Portal",
    tags: ["support", "customer service", "templates"],
    prompt: "Draft a friendly and helpful customer support response to address the following issue: [ISSUE]. The response should empathize with the customer, provide a clear solution, and include follow-up steps if necessary."
  },
  {
    id: 4,
    title: "Bug Report Analysis",
    category: "Development",
    description: "Analyzes bug reports and suggests potential solutions",
    effectiveness: "Medium",
    dateCreated: "2023-09-18",
    projectId: null,
    projectName: null,
    tags: ["bugs", "development", "analysis"],
    prompt: "Analyze the following bug report and suggest potential causes and solutions: [BUG REPORT]. Include questions that might help further diagnose the issue and steps to reproduce for verification."
  },
  {
    id: 5,
    title: "Weekly Report Generator",
    category: "Reporting",
    description: "Creates structured weekly progress reports",
    effectiveness: "High",
    dateCreated: "2023-08-30",
    projectId: 1,
    projectName: "Project Alpha",
    tags: ["reporting", "weekly", "progress"],
    prompt: "Generate a comprehensive weekly progress report for the period [DATE RANGE] with the following metrics and achievements: [METRICS]. Structure the report with sections for accomplishments, challenges, upcoming work, and resource needs."
  },
  {
    id: 6,
    title: "Social Media Post Ideas",
    category: "Social Media",
    description: "Generates creative social media post ideas for various platforms",
    effectiveness: "Medium",
    dateCreated: "2023-09-25",
    projectId: 5,
    projectName: "Analytics Engine",
    tags: ["social media", "content", "marketing"],
    prompt: "Generate 5 creative social media post ideas for [PLATFORM] focusing on [TOPIC/PRODUCT]. Each idea should include a suggested caption, hashtags, and description of visual content. Tailor the tone to match our brand voice which is [BRAND VOICE]."
  },
  {
    id: 7,
    title: "UI Error Message Suggestions",
    category: "UX/UI",
    description: "Creates user-friendly error messages for different UI scenarios",
    effectiveness: "High",
    dateCreated: "2023-08-05",
    projectId: 2,
    projectName: "Dashboard X",
    tags: ["ui", "ux", "error messages"],
    prompt: "Create user-friendly error messages for the following scenarios in our application: [SCENARIOS]. Each message should be concise, helpful, non-technical for end-users, and include a suggestion for how to resolve the issue."
  },
  {
    id: 8,
    title: "Feature Requirement Specification",
    category: "Development",
    description: "Expands feature ideas into detailed technical requirements",
    effectiveness: "High",
    dateCreated: "2023-07-15",
    projectId: 3,
    projectName: "LMS Portal",
    tags: ["development", "requirements", "specification"],
    prompt: "Expand the following feature idea into a detailed software requirement specification: [FEATURE IDEA]. Include functional requirements, technical considerations, potential API endpoints, data models, and user interface elements."
  }
];

const Prompts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Prompt has been copied to your clipboard.",
    });
  };

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
                    onClick={() => copyToClipboard(prompt.prompt)}
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
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(prompt.prompt)}>
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
                            <DropdownMenuItem onClick={() => copyToClipboard(prompt.prompt)}>
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
