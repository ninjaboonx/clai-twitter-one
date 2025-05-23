import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface ContentIdeasProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ContentIdeas({ className, ...props }: ContentIdeasProps) {
  const ideas = [
    {
      id: 1,
      topic: "AI Ethics in Business",
      relevance: "trending",
      description: "Discuss the ethical considerations businesses should make when implementing AI solutions.",
    },
    {
      id: 2,
      topic: "Remote Work Tools",
      relevance: "evergreen",
      description: "Share your top 5 tools that have improved your remote work productivity.",
    },
    {
      id: 3,
      topic: "Tech Industry Layoffs",
      relevance: "trending",
      description: "Analyze recent tech industry layoffs and what they mean for the future of the sector.",
    },
    {
      id: 4,
      topic: "Personal Branding Tips",
      relevance: "evergreen",
      description: "Provide actionable tips for professionals looking to build their personal brand on Twitter.",
    },
  ]

  return (
    <Card className={className} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>AI-Generated Content Ideas</CardTitle>
          <CardDescription>Trending topics and content suggestions for your audience.</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ideas.map((idea) => (
            <div key={idea.id} className="space-y-2 rounded-md border p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{idea.topic}</h4>
                <Badge variant={idea.relevance === "trending" ? "default" : "secondary"}>{idea.relevance}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{idea.description}</p>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create from this idea
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
