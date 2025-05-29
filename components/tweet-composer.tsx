"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ImageIcon,
  LinkIcon,
  SmileIcon,
  SparklesIcon,
  Wand2Icon,
  RefreshCwIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  SendIcon,
  CalendarClockIcon,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, ClockIcon } from "lucide-react" // Import CalendarIcon and ClockIcon

export function TweetComposer() {
  const [content, setContent] = useState("")
  const [characterCount, setCharacterCount] = useState(0)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const maxCharacters = 280

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    setCharacterCount(newContent.length)
  }

  const generateAISuggestions = () => {
    setIsGenerating(true)

    // Simulate AI generation delay
    setTimeout(() => {
      setAiSuggestions([
        "Excited to share our latest insights on AI-powered content creation! Check out how it's transforming the way marketers work in 2025. #ContentMarketing #AITools",
        "Just published: 5 ways AI is revolutionizing content creation for marketers. The results might surprise you! #MarketingTips #ArtificialIntelligence",
        "AI tools are changing the game for content creators. Here's how we're using them to boost productivity by 3x while maintaining quality. #ProductivityHacks #ContentCreation",
      ])
      setIsGenerating(false)
    }, 1500)
  }

  const selectSuggestion = (suggestion: string) => {
    setContent(suggestion)
    setCharacterCount(suggestion.length)
    setShowPreview(true)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="compose">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="compose">Compose</TabsTrigger>
              <TabsTrigger value="ai-assist">AI Assist</TabsTrigger>
            </TabsList>
            <TabsContent value="compose" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="What's happening?"
                  className="min-h-[120px] resize-none"
                  value={content}
                  onChange={handleContentChange}
                />
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <ImageIcon className="h-4 w-4" />
                      <span className="sr-only">Add image</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <SmileIcon className="h-4 w-4" />
                      <span className="sr-only">Add emoji</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <LinkIcon className="h-4 w-4" />
                      <span className="sr-only">Add link</span>
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <SparklesIcon className="h-4 w-4" />
                          <span className="sr-only">AI enhance</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-4">
                          <h4 className="font-medium leading-none">AI Enhancement</h4>
                          <p className="text-sm text-muted-foreground">
                            Let AI improve your tweet for better engagement.
                          </p>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 gap-2">
                              <Button variant="outline" size="sm">
                                Shorten
                              </Button>
                              <Button variant="outline" size="sm">
                                Expand
                              </Button>
                              <Button variant="outline" size="sm">
                                Emojify
                              </Button>
                            </div>
                            <Button className="w-full">
                              <Wand2Icon className="mr-2 h-4 w-4" />
                              Enhance Tweet
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div
                    className={cn(
                      "text-sm",
                      characterCount > maxCharacters ? "text-destructive" : "text-muted-foreground",
                    )}
                  >
                    {characterCount}/{maxCharacters}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="informative">Informative</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2">
                  <Label>Hashtags</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">#ContentMarketing</Badge>
                    <Badge variant="outline">#AITools</Badge>
                    <Badge variant="outline">#SocialMedia</Badge>
                    <Badge variant="outline">+ Add</Badge>
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <Button variant="outline">
                  <CalendarClockIcon className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button>
                  <SendIcon className="mr-2 h-4 w-4" />
                  Tweet
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="ai-assist" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic or Keywords</Label>
                  <Input id="topic" placeholder="e.g., AI content creation, marketing automation" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tone-ai">Tone</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger id="tone-ai">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        <SelectItem value="informative">Informative</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="audience">Target Audience</Label>
                    <Select defaultValue="marketers">
                      <SelectTrigger id="audience">
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marketers">Marketers</SelectItem>
                        <SelectItem value="developers">Developers</SelectItem>
                        <SelectItem value="executives">Executives</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Include Link (Optional)</Label>
                  <Input id="link" placeholder="https://example.com/your-article" />
                </div>
                <Button className="w-full" onClick={generateAISuggestions} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2Icon className="mr-2 h-4 w-4" />
                      Generate Tweet Suggestions
                    </>
                  )}
                </Button>
              </div>
              {aiSuggestions.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h4 className="font-medium">AI-Generated Suggestions</h4>
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="rounded-md border p-3">
                        <p className="text-sm">{suggestion}</p>
                        <div className="flex justify-between pt-2">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ThumbsUpIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ThumbsDownIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => selectSuggestion(suggestion)}>
                            Use This
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full" onClick={generateAISuggestions}>
                    <RefreshCwIcon className="mr-2 h-4 w-4" />
                    Generate More
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Preview</h3>
            <div className="rounded-lg border p-4">
              {showPreview || content ? (
                <div className="flex space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@acmecorp" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="font-semibold">Acme Corp</span>
                      <span className="ml-2 text-muted-foreground">@acmecorp</span>
                      <span className="ml-2 text-muted-foreground">·</span>
                      <span className="ml-2 text-muted-foreground">Just now</span>
                    </div>
                    <p>{content || "Your tweet will appear here."}</p>
                  </div>
                </div>
              ) : (
                <div className="flex h-[150px] items-center justify-center text-muted-foreground">
                  Your tweet preview will appear here.
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Scheduling</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="flex">
                    <Input id="date" type="date" className="rounded-r-none" />
                    <Button variant="outline" className="rounded-l-none">
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="flex">
                    <Input id="time" type="time" className="rounded-r-none" />
                    <Button variant="outline" className="rounded-l-none">
                      <ClockIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">AI Insights</h4>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm">
                  <span className="font-medium">Engagement Prediction:</span> This tweet is likely to receive 15-20%
                  higher engagement than your average posts due to trending hashtags and clear call-to-action.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
