import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Clock, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UpcomingPostsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UpcomingPosts({ className, ...props }: UpcomingPostsProps) {
  const scheduledPosts = [
    {
      id: 1,
      content:
        "Excited to announce our new AI-powered feature that helps you create better content in half the time! #ProductivityHack #AI",
      scheduledFor: "2025-05-18T10:00:00",
      type: "tweet",
      account: "@acmecorp",
    },
    {
      id: 2,
      content: "Thread: 5 ways AI is transforming content creation for marketers in 2025...",
      scheduledFor: "2025-05-19T14:30:00",
      type: "thread",
      account: "@acmecorp",
    },
    {
      id: 3,
      content:
        "Check out our latest blog post on sustainable tech practices and how they're shaping the future of innovation.",
      scheduledFor: "2025-05-20T09:15:00",
      type: "article",
      account: "@johndoe",
    },
  ]

  return (
    <Card className={className} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Upcoming Posts</CardTitle>
          <CardDescription>Your scheduled content for the next few days.</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduledPosts.map((post) => {
            const date = new Date(post.scheduledFor)
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })

            return (
              <div key={post.id} className="flex items-start space-x-4 rounded-md border p-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt={post.account} />
                  <AvatarFallback>{post.account.substring(1, 3).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">{post.account}</p>
                    <Badge variant="outline" className="capitalize">
                      {post.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                  <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{formattedDate}</span>
                    <Clock className="ml-3 mr-1 h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{formattedTime}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
