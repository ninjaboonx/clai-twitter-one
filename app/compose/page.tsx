"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TweetComposer } from "@/components/tweet-composer"
import { ThreadComposer } from "@/components/thread-composer"
import { ArticleComposer } from "@/components/article-composer"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function ComposePage() {
  const [activeTab, setActiveTab] = useState("tweet")

  return (
    <DashboardShell>
      <DashboardHeader heading="Compose" text="Create and schedule your Twitter content with AI assistance.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Content
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="tweet" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tweet">Tweet</TabsTrigger>
          <TabsTrigger value="thread">Thread</TabsTrigger>
          <TabsTrigger value="article">Article</TabsTrigger>
        </TabsList>
        <TabsContent value="tweet">
          <TweetComposer />
        </TabsContent>
        <TabsContent value="thread">
          <ThreadComposer />
        </TabsContent>
        <TabsContent value="article">
          <ArticleComposer />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
