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
  Calendar,
  Clock,
  LinkIcon,
  Wand2,
  RefreshCw,
  Send,
  CalendarClock,
  FileText,
  ExternalLink,
  Copy,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function ArticleComposer() {
  const [articleUrl, setArticleUrl] = useState("")
  const [articleContent, setArticleContent] = useState("")
  const [summary, setSummary] = useState("")
  const [teaserTweet, setTeaserTweet] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [characterCount, setCharacterCount] = useState(0)
  const maxCharacters = 280

  const handleTeaserChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setTeaserTweet(newContent)
    setCharacterCount(newContent.length)
  }

  const generateFromArticle = () => {
    setIsGenerating(true)

    // Simulate AI generation delay
    setTimeout(() => {
      setSummary(
        "This comprehensive article explores how AI is revolutionizing content creation for marketers in 2025. It covers five key trends: automated content generation, hyper-personalization, predictive analytics for content strategy, AI-powered content optimization, and advanced sentiment analysis. The article provides practical examples of how these technologies are being implemented by leading brands to increase efficiency and engagement.",
      )

      setTeaserTweet(
        'Just published: "The Future of AI in Content Marketing" - Discover how AI is transforming how marketers create and optimize content in 2025. Read the full article to learn about the 5 key trends you need to know. #AIMarketing #ContentStrategy',
      )

      setCharacterCount(teaserTweet.length)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="url">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url">From URL</TabsTrigger>
                <TabsTrigger value="text">From Text</TabsTrigger>
              </TabsList>
              <TabsContent value="url" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="article-url">Article URL</Label>
                  <div className="flex">
                    <Input
                      id="article-url"
                      placeholder="https://example.com/your-article"
                      value={articleUrl}
                      onChange={(e) => setArticleUrl(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button variant="outline" className="rounded-l-none">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="summary-length">Summary Length</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="summary-length">
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (1-2 sentences)</SelectItem>
                        <SelectItem value="medium">Medium (3-4 sentences)</SelectItem>
                        <SelectItem value="long">Long (5+ sentences)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="summary-tone">Summary Tone</Label>
                    <Select defaultValue="informative">
                      <SelectTrigger id="summary-tone">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        <SelectItem value="informative">Informative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full" onClick={generateFromArticle} disabled={isGenerating || !articleUrl}>
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Article...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Summary & Teaser
                    </>
                  )}
                </Button>
              </TabsContent>
              <TabsContent value="text" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="article-content">Article Content</Label>
                  <Textarea
                    id="article-content"
                    placeholder="Paste your article content here..."
                    className="min-h-[200px]"
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-summary-length">Summary Length</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="text-summary-length">
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (1-2 sentences)</SelectItem>
                        <SelectItem value="medium">Medium (3-4 sentences)</SelectItem>
                        <SelectItem value="long">Long (5+ sentences)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text-summary-tone">Summary Tone</Label>
                    <Select defaultValue="informative">
                      <SelectTrigger id="text-summary-tone">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        <SelectItem value="informative">Informative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full" onClick={generateFromArticle} disabled={isGenerating || !articleContent}>
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Content...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Summary & Teaser
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {summary && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Article Summary</h3>
                  <Button variant="ghost" size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm">{summary}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {teaserTweet && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Teaser Tweet</h3>
                <div className="space-y-2">
                  <Textarea value={teaserTweet} onChange={handleTeaserChange} className="min-h-[100px] resize-none" />
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Wand2 className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                      <Button variant="outline" size="sm">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Add Link
                      </Button>
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
                <div className="flex flex-col space-y-2">
                  <Label>Suggested Hashtags</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">#AIMarketing</Badge>
                    <Badge variant="outline">#ContentStrategy</Badge>
                    <Badge variant="outline">#MarketingTrends</Badge>
                    <Badge variant="outline">#ContentCreation</Badge>
                    <Badge variant="outline">+ Add</Badge>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline">
                    <CalendarClock className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Tweet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Preview</h3>
            <div className="rounded-lg border p-4">
              {teaserTweet ? (
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
                    <p>{teaserTweet}</p>
                    <div className="mt-3 rounded-md border p-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">The Future of AI in Content Marketing</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                        {summary || "Article summary will appear here."}
                      </p>
                      <div className="mt-2 text-xs text-primary">example.com</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                  Your article teaser preview will appear here.
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Scheduling</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="article-date">Date</Label>
                  <div className="flex">
                    <Input id="article-date" type="date" className="rounded-r-none" />
                    <Button variant="outline" className="rounded-l-none">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="article-time">Time</Label>
                  <div className="flex">
                    <Input id="article-time" type="time" className="rounded-r-none" />
                    <Button variant="outline" className="rounded-l-none">
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Additional Options</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="thread-option">Create Thread from Article</Label>
                  <Select defaultValue="no">
                    <SelectTrigger id="thread-option">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No, just post the teaser</SelectItem>
                      <SelectItem value="3">Yes, create a 3-tweet thread</SelectItem>
                      <SelectItem value="5">Yes, create a 5-tweet thread</SelectItem>
                      <SelectItem value="custom">Yes, custom thread length</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="key-takeaways">Generate Key Takeaways</Label>
                  <Select defaultValue="no">
                    <SelectTrigger id="key-takeaways">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="3">Yes, 3 key takeaways</SelectItem>
                      <SelectItem value="5">Yes, 5 key takeaways</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">AI Content Insights</h4>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm">
                  <span className="font-medium">Article Quality:</span> High - This article contains valuable insights
                  and data that your audience will find useful.
                </p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Recommendation:</span> Consider creating a thread to highlight the 5 key
                  trends mentioned in the article for maximum engagement.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
