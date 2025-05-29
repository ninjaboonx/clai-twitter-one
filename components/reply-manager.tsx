"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  ThumbsUp,
  Repeat,
  Send,
  RefreshCw,
  Wand2,
  Clock,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ReplyManager() {
  const [selectedMention, setSelectedMention] = useState<any>(null)
  const [replyText, setReplyText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  const mentions = [
    {
      id: 1,
      type: "mention",
      priority: "high",
      sentiment: "positive",
      user: {
        name: "Sarah Johnson",
        handle: "@sarahjohnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "@acmecorp Your AI tool has completely transformed how I create content! Any plans for new features soon?",
      time: "10 minutes ago",
      stats: {
        likes: 5,
        retweets: 2,
        replies: 1,
      },
      status: "pending",
    },
    {
      id: 2,
      type: "reply",
      priority: "medium",
      sentiment: "neutral",
      user: {
        name: "Tech Enthusiast",
        handle: "@techenthusiast",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "This is a game-changer for content creators. I've been looking for something like this! How does it compare to other AI tools on the market?",
      time: "45 minutes ago",
      stats: {
        likes: 12,
        retweets: 4,
        replies: 3,
      },
      status: "pending",
    },
    {
      id: 3,
      type: "mention",
      priority: "low",
      sentiment: "negative",
      user: {
        name: "Critical User",
        handle: "@criticaluser",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "@acmecorp I've been trying to use your platform for hours and keep getting errors. Your customer support isn't responding either. Very frustrating experience!",
      time: "2 hours ago",
      stats: {
        likes: 3,
        retweets: 1,
        replies: 2,
      },
      status: "pending",
    },
    {
      id: 4,
      type: "reply",
      priority: "medium",
      sentiment: "positive",
      user: {
        name: "Marketing Pro",
        handle: "@marketingpro",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Just discovered @acmecorp's new AI content tool and I'm blown away by how intuitive it is. Would love to see integration with Canva in the future!",
      time: "3 hours ago",
      stats: {
        likes: 28,
        retweets: 15,
        replies: 7,
      },
      status: "responded",
    },
  ]

  const handleSelectMention = (mention: any) => {
    setSelectedMention(mention)
    setReplyText("")
    setAiSuggestions([])
  }

  const generateAIReplies = () => {
    if (!selectedMention) return

    setIsGenerating(true)

    // Simulate AI generation delay
    setTimeout(() => {
      if (selectedMention.sentiment === "positive") {
        setAiSuggestions([
          "Thank you for the kind words, Sarah! We're thrilled to hear our AI tool is helping with your content creation. We're actually launching some exciting new features next month, including advanced analytics and template customization. Stay tuned!",
          "We appreciate the feedback, Sarah! 🙌 Excited to share that we have several new features in the pipeline, including improved personalization and multi-platform publishing. Would love to hear what specific features you'd like to see!",
          "Thanks for the support, Sarah! We're constantly working to improve our tool. New features coming in the next update include enhanced AI suggestions and integration with more platforms. Is there anything specific you'd like to see added?",
        ])
      } else if (selectedMention.sentiment === "negative") {
        setAiSuggestions([
          "We're really sorry to hear about your experience. This isn't the level of service we aim to provide. Could you DM us the specific errors you're encountering? Our support team will prioritize your case and help resolve these issues ASAP.",
          "I apologize for the frustration you're experiencing. We take these issues seriously and want to make it right. Please DM us your account details so our technical team can investigate immediately. We appreciate your patience.",
          "We're sorry for the trouble you're having. Our team is looking into the reported errors. Could you please DM us with more details about what you're experiencing? We'll make sure someone from our support team reaches out to you directly.",
        ])
      } else {
        setAiSuggestions([
          "Thanks for your interest! Our tool differs from others in the market through our proprietary AI algorithms that learn from your content style over time, providing increasingly personalized suggestions. We also offer more extensive template options and integration capabilities.",
          "Great question! What sets us apart is our focus on maintaining your unique voice while enhancing content quality. Unlike competitors, we offer unlimited generations, more customization options, and direct publishing to multiple platforms. Have you tried any other AI tools?",
          "Appreciate your question! The main differences are our advanced personalization (the AI learns your style), our extensive template library (200+ options), and our all-in-one approach that handles creation, optimization, and scheduling. Would you like more specific comparisons with any particular tool?",
        ])
      }
      setIsGenerating(false)
    }, 1500)
  }

  const selectSuggestion = (suggestion: string) => {
    setReplyText(suggestion)
  }

  const sendReply = () => {
    if (!selectedMention || !replyText) return

    // In a real app, this would send the reply to the Twitter API
    console.log(`Sending reply to ${selectedMention.user.handle}: ${replyText}`)

    // Update the mention status
    const updatedMentions = mentions.map((mention) =>
      mention.id === selectedMention.id ? { ...mention, status: "responded" } : mention,
    )

    // Clear the selected mention and reply text
    setSelectedMention(null)
    setReplyText("")
    setAiSuggestions([])
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Mentions & Replies</CardTitle>
              <CardDescription>Manage incoming mentions and replies from Twitter.</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative w-full max-w-[200px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search mentions..." className="w-full pl-8" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>All Mentions</DropdownMenuItem>
                    <DropdownMenuItem>Positive Sentiment</DropdownMenuItem>
                    <DropdownMenuItem>Negative Sentiment</DropdownMenuItem>
                    <DropdownMenuItem>High Priority</DropdownMenuItem>
                    <DropdownMenuItem>Pending Responses</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="responded">Responded</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="space-y-4 pt-4">
              {mentions
                .filter((mention) => mention.status === "pending")
                .map((mention) => (
                  <div
                    key={mention.id}
                    className={`flex space-x-4 rounded-lg border p-4 cursor-pointer transition-colors ${selectedMention?.id === mention.id ? "bg-muted" : "hover:bg-muted/50"}`}
                    onClick={() => handleSelectMention(mention)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={mention.user.avatar || "/placeholder.svg"} alt={mention.user.handle} />
                      <AvatarFallback>{mention.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{mention.user.name}</p>
                        <p className="text-sm text-muted-foreground">{mention.user.handle}</p>
                        <div className="flex items-center ml-auto space-x-1">
                          <Badge
                            variant={
                              mention.priority === "high"
                                ? "destructive"
                                : mention.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {mention.priority}
                          </Badge>
                          <Badge
                            variant={
                              mention.sentiment === "positive"
                                ? "outline"
                                : mention.sentiment === "negative"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {mention.sentiment}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm">{mention.content}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center text-muted-foreground">
                          <ThumbsUp className="mr-1 h-3.5 w-3.5" />
                          <span className="text-xs">{mention.stats.likes}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Repeat className="mr-1 h-3.5 w-3.5" />
                          <span className="text-xs">{mention.stats.retweets}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MessageSquare className="mr-1 h-3.5 w-3.5" />
                          <span className="text-xs">{mention.stats.replies}</span>
                        </div>
                        <span className="ml-auto text-xs text-muted-foreground flex items-center">
                          <Clock className="mr-1 h-3.5 w-3.5" />
                          {mention.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>
            <TabsContent value="responded" className="space-y-4 pt-4">
              {mentions
                .filter((mention) => mention.status === "responded")
                .map((mention) => (
                  <div
                    key={mention.id}
                    className={`flex space-x-4 rounded-lg border p-4 cursor-pointer transition-colors ${selectedMention?.id === mention.id ? "bg-muted" : "hover:bg-muted/50"}`}
                    onClick={() => handleSelectMention(mention)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={mention.user.avatar || "/placeholder.svg"} alt={mention.user.handle} />
                      <AvatarFallback>{mention.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{mention.user.name}</p>
                        <p className="text-sm text-muted-foreground">{mention.user.handle}</p>
                        <Badge variant="outline" className="ml-auto">
                          Responded
                        </Badge>
                      </div>
                      <p className="text-sm">{mention.content}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center text-muted-foreground">
                          <ThumbsUp className="mr-1 h-3.5 w-3.5" />
                          <span className="text-xs">{mention.stats.likes}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Repeat className="mr-1 h-3.5 w-3.5" />
                          <span className="text-xs">{mention.stats.retweets}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MessageSquare className="mr-1 h-3.5 w-3.5" />
                          <span className="text-xs">{mention.stats.replies}</span>
                        </div>
                        <span className="ml-auto text-xs text-muted-foreground flex items-center">
                          <Clock className="mr-1 h-3.5 w-3.5" />
                          {mention.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>
            <TabsContent value="all" className="space-y-4 pt-4">
              {mentions.map((mention) => (
                <div
                  key={mention.id}
                  className={`flex space-x-4 rounded-lg border p-4 cursor-pointer transition-colors ${selectedMention?.id === mention.id ? "bg-muted" : "hover:bg-muted/50"}`}
                  onClick={() => handleSelectMention(mention)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={mention.user.avatar || "/placeholder.svg"} alt={mention.user.handle} />
                    <AvatarFallback>{mention.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{mention.user.name}</p>
                      <p className="text-sm text-muted-foreground">{mention.user.handle}</p>
                      <Badge variant={mention.status === "responded" ? "outline" : "default"} className="ml-auto">
                        {mention.status === "responded" ? "Responded" : "Pending"}
                      </Badge>
                    </div>
                    <p className="text-sm">{mention.content}</p>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center text-muted-foreground">
                        <ThumbsUp className="mr-1 h-3.5 w-3.5" />
                        <span className="text-xs">{mention.stats.likes}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Repeat className="mr-1 h-3.5 w-3.5" />
                        <span className="text-xs">{mention.stats.retweets}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MessageSquare className="mr-1 h-3.5 w-3.5" />
                        <span className="text-xs">{mention.stats.replies}</span>
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        {mention.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Reply Composer</CardTitle>
          <CardDescription>Craft your response with AI assistance.</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedMention ? (
            <div className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedMention.user.avatar || "/placeholder.svg"}
                      alt={selectedMention.user.handle}
                    />
                    <AvatarFallback>{selectedMention.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="font-medium">{selectedMention.user.name}</span>
                      <span className="ml-2 text-muted-foreground">{selectedMention.user.handle}</span>
                    </div>
                    <p className="text-sm">{selectedMention.content}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Your Reply</h4>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="professional">
                      <SelectTrigger className="w-[180px] h-8">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="supportive">Supportive</SelectItem>
                        <SelectItem value="apologetic">Apologetic</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={generateAIReplies} disabled={isGenerating}>
                      {isGenerating ? (
                        <>
                          <RefreshCw className="mr-2 h-3.5 w-3.5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-3.5 w-3.5" />
                          AI Suggest
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <Textarea
                  placeholder={`Reply to ${selectedMention.user.handle}...`}
                  className="min-h-[120px]"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSelectedMention(null)}>
                    Cancel
                  </Button>
                  <Button onClick={sendReply} disabled={!replyText}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Reply
                  </Button>
                </div>
              </div>

              {aiSuggestions.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">AI-Suggested Replies</h4>
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="rounded-md border p-3">
                      <p className="text-sm">{suggestion}</p>
                      <div className="flex justify-end pt-2">
                        <Button variant="outline" size="sm" onClick={() => selectSuggestion(suggestion)}>
                          Use This
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-md bg-muted p-4 space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                  AI Analysis
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Sentiment:</span>{" "}
                    {selectedMention.sentiment.charAt(0).toUpperCase() + selectedMention.sentiment.slice(1)}
                  </p>
                  <p>
                    <span className="font-medium">Intent:</span>{" "}
                    {selectedMention.type === "mention" ? "Question about features" : "Seeking comparison information"}
                  </p>
                  <p>
                    <span className="font-medium">Recommended approach:</span>{" "}
                    {selectedMention.sentiment === "positive"
                      ? "Thank the user and provide specific information about upcoming features"
                      : selectedMention.sentiment === "negative"
                        ? "Apologize and offer immediate assistance"
                        : "Provide detailed comparison and ask follow-up questions"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Mention Selected</h3>
              <p className="text-muted-foreground mt-2">
                Select a mention or reply from the list to craft your response.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
