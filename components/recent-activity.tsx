import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, ThumbsUp, Repeat } from "lucide-react"

interface RecentActivityProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentActivity({ className, ...props }: RecentActivityProps) {
  const activities = [
    {
      id: 1,
      type: "mention",
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
    },
    {
      id: 2,
      type: "reply",
      user: {
        name: "Tech Enthusiast",
        handle: "@techenthusiast",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "This is a game-changer for content creators. I've been looking for something like this!",
      time: "45 minutes ago",
      stats: {
        likes: 12,
        retweets: 4,
        replies: 3,
      },
    },
    {
      id: 3,
      type: "engagement",
      user: {
        name: "Marketing Pro",
        handle: "@marketingpro",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Just discovered @acmecorp's new AI content tool and I'm blown away by how intuitive it is.",
      time: "2 hours ago",
      stats: {
        likes: 28,
        retweets: 15,
        replies: 7,
      },
    },
  ]

  return (
    <Card className={className} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Mentions, replies, and engagement from your audience.</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.handle} />
                <AvatarFallback>{activity.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{activity.user.name}</p>
                  <p className="text-sm text-muted-foreground">{activity.user.handle}</p>
                  <Badge variant="outline" className="ml-auto">
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm">{activity.content}</p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center text-muted-foreground">
                    <ThumbsUp className="mr-1 h-3.5 w-3.5" />
                    <span className="text-xs">{activity.stats.likes}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Repeat className="mr-1 h-3.5 w-3.5" />
                    <span className="text-xs">{activity.stats.retweets}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MessageSquare className="mr-1 h-3.5 w-3.5" />
                    <span className="text-xs">{activity.stats.replies}</span>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
