"use client"

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
  Calendar,
  Clock,
  ImageIcon,
  Link,
  Smile,
  Sparkles,
  Wand2,
  RefreshCw,
  Send,
  CalendarClock,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function ThreadComposer() {
  const [threadTweets, setThreadTweets] = useState([
    {
      id: 1,
      content: "1/ Thread: 5 ways AI is transforming content creation for marketers in 2025...",
      characterCount: 74,
    },
    {
      id: 2,
      content:
        "2/ First, AI-powered content generation tools are reducing creation time by up to 70%, allowing marketers to focus on strategy rather than execution.",
      characterCount: 140,
    },
    {
      id: 3,
      content:
        "3/ Second, personalization at scale is now possible with AI analyzing user behavior and preferences to tailor content for different audience segments automatically.",
      characterCount: 150,
    },
  ])
  const [isGenerating, setIsGenerating] = useState(false)
  const maxCharacters = 280

  const handleTweetChange = (id: number, content: string) => {
    setThreadTweets(
      threadTweets.map((tweet) => (tweet.id === id ? { ...tweet, content, characterCount: content.length } : tweet)),
    )
  }

  const addNewTweet = () => {
    const newId = Math.max(...threadTweets.map((t) => t.id)) + 1
    setThreadTweets([...threadTweets, { id: newId, content: `${newId}/ `, characterCount: 3 }])
  }

  const removeTweet = (id: number) => {
    if (threadTweets.length > 1) {
      setThreadTweets(threadTweets.filter((tweet) => tweet.id !== id))

      // Renumber the tweets
      setThreadTweets((prev) =>
        prev.map((tweet, index) => ({
          ...tweet,
          content: `${index + 1}/${tweet.content.substring(tweet.content.indexOf("/") + 1)}`,
          characterCount: `${index + 1}/${tweet.content.substring(tweet.content.indexOf("/") + 1)}`.length,
        })),
      )
    }
  }

  const moveTweet = (id: number, direction: "up" | "down") => {
    const index = threadTweets.findIndex((tweet) => tweet.id === id)
    if ((direction === "up" && index > 0) || (direction === "down" && index < threadTweets.length - 1)) {
      const newThreadTweets = [...threadTweets]
      const targetIndex = direction === "up" ? index - 1 : index + 1
      ;[newThreadTweets[index], newThreadTweets[targetIndex]] = [newThreadTweets[targetIndex], newThreadTweets[index]]

      // Renumber the tweets
      setThreadTweets(
        newThreadTweets.map((tweet, index) => ({
          ...tweet,
          content: `${index + 1}/${tweet.content.substring(tweet.content.indexOf("/") + 1)}`,
          characterCount: `${index + 1}/${tweet.content.substring(tweet.content.indexOf("/") + 1)}`.length,
        })),
      )
    }
  }

  const generateAIThread = () => {
    setIsGenerating(true)

    // Simulate AI generation delay
    setTimeout(() => {
      setThreadTweets([
        {
          id: 1,
          content: "1/ Thread: 5 ways AI is transforming content creation for marketers in 2025...",
          characterCount: 74,
        },
        {
          id: 2,
          content:
            "2/ First, AI-powered content generation tools are reducing creation time by up to 70%, allowing marketers to focus on strategy rather than execution.",
          characterCount: 140,
        },
        {
          id: 3,
          content:
            "3/ Second, personalization at scale is now possible with AI analyzing user behavior and preferences to tailor content for different audience segments automatically.",
          characterCount: 150,
        },
        {
          id: 4,
          content:
            "4/ Third, AI-driven content optimization ensures your posts are perfectly timed and formatted for maximum engagement across platforms.",
          characterCount: 130,
        },
        {
          id: 5,
          content:
            "5/ Fourth, advanced sentiment analysis helps marketers understand audience reactions in real-time, allowing for quick pivots when needed.",
          characterCount: 135,
        },
        {
          id: 6,
          content:
            "6/ Finally, AI content auditing tools can analyze your entire content library to identify gaps and opportunities for repurposing. #AIMarketing #ContentStrategy",
          characterCount: 160,
        },
      ])
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="compose">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="compose">Compose Thread</TabsTrigger>
                <TabsTrigger value="ai-assist">AI Assist</TabsTrigger>
              </TabsList>
              <TabsContent value="compose" className="space-y-4 pt-4">
                <div className="space-y-4">
                  {threadTweets.map((tweet, index) => (
                    <div key={tweet.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`tweet-${tweet.id}`}>Tweet {index + 1}</Label>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => moveTweet(tweet.id, "up")}
                            disabled={index === 0}
                          >
                            <MoveUp className="h-4 w-4" />
                            <span className="sr-only">Move up</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => moveTweet(tweet.id, "down")}
                            disabled={index === threadTweets.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                            <span className="sr-only">Move down</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeTweet(tweet.id)}
                            disabled={threadTweets.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        id={`tweet-${tweet.id}`}
                        value={tweet.content}
                        onChange={(e) => handleTweetChange(tweet.id, e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon">
                            <ImageIcon className="h-4 w-4" />
                            <span className="sr-only">Add image</span>
                          </Button>
                          <Button variant="outline" size="icon">
                            <Smile className="h-4 w-4" />
                            <span className="sr-only">Add emoji</span>
                          </Button>
                          <Button variant="outline" size="icon">
                            <Link className="h-4 w-4" />
                            <span className="sr-only">Add link</span>
                          </Button>
                          <Button variant="outline" size="icon">
                            <Sparkles className="h-4 w-4" />
                            <span className="sr-only">AI enhance</span>
                          </Button>
                        </div>
                        <div
                          className={cn(
                            "text-sm",
                            tweet.characterCount > maxCharacters ? "text-destructive" : "text-muted-foreground",
                          )}
                        >
                          {tweet.characterCount}/{maxCharacters}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={addNewTweet}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Tweet
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="tone">Thread Tone</Label>
                    <Select defaultValue="informative">
                      <SelectTrigger id="tone">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        <SelectItem value="informative">Informative</SelectItem>
                        <SelectItem value="storytelling">Storytelling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Hashtags (Last Tweet)</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">#AIMarketing</Badge>
                      <Badge variant="outline">#ContentStrategy</Badge>
                      <Badge variant="outline">#MarketingTips</Badge>
                      <Badge variant="outline">+ Add</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline">
                    <CalendarClock className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Post Thread
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="ai-assist" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="thread-topic">Thread Topic</Label>
                    <Input id="thread-topic" placeholder="e.g., AI in marketing, content creation trends" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="thread-length">Thread Length</Label>
                      <Select defaultValue="5">
                        <SelectTrigger id="thread-length">
                          <SelectValue placeholder="Number of tweets" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 tweets</SelectItem>
                          <SelectItem value="5">5 tweets</SelectItem>
                          <SelectItem value="7">7 tweets</SelectItem>
                          <SelectItem value="10">10 tweets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="thread-tone">Thread Tone</Label>
                      <Select defaultValue="informative">
                        <SelectTrigger id="thread-tone">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                          <SelectItem value="informative">Informative</SelectItem>
                          <SelectItem value="storytelling">Storytelling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="key-points">Key Points (Optional)</Label>
                    <Textarea
                      id="key-points"
                      placeholder="Enter main points to include in your thread, one per line"
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button className="w-full" onClick={generateAIThread} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating Thread...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Thread
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Thread Preview</h3>
            <div className="max-h-[600px] overflow-y-auto rounded-lg border p-4">
              {threadTweets.length > 0 ? (
                <div className="space-y-6">
                  {threadTweets.map((tweet, index) => (
                    <div key={tweet.id} className="flex space-x-3">
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
                        <p>{tweet.content}</p>
                        {index < threadTweets.length - 1 && <div className="h-6 w-0.5 ml-4 bg-border" />}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[150px] items-center justify-center text-muted-foreground">
                  Your thread preview will appear here.
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Thread Settings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="thread-date">Date</Label>
                  <div className="flex">
                    <Input id="thread-date" type="date" className="rounded-r-none" />
                    <Button variant="outline" className="rounded-l-none">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thread-time">Time</Label>
                  <div className="flex">
                    <Input id="thread-time" type="time" className="rounded-r-none" />
                    <Button variant="outline" className="rounded-l-none">
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <Label htmlFor="posting-interval">Posting Interval</Label>
                <Select defaultValue="1">
                  <SelectTrigger id="posting-interval">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Post all at once</SelectItem>
                    <SelectItem value="1">1 minute between tweets</SelectItem>
                    <SelectItem value="2">2 minutes between tweets</SelectItem>
                    <SelectItem value="5">5 minutes between tweets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">AI Thread Analysis</h4>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm">
                  <span className="font-medium">Thread Coherence:</span> High - Your tweets flow logically and maintain
                  a consistent narrative.
                </p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Engagement Prediction:</span> This thread format has a 35% higher chance
                  of being shared compared to single tweets on the same topic.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
