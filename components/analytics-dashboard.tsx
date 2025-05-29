"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function AnalyticsDashboard() {
  const engagementData = [
    { name: "Jan", likes: 400, replies: 240, retweets: 180 },
    { name: "Feb", likes: 300, replies: 139, retweets: 221 },
    { name: "Mar", likes: 200, replies: 980, retweets: 290 },
    { name: "Apr", likes: 278, replies: 390, retweets: 200 },
    { name: "May", likes: 189, replies: 480, retweets: 181 },
    { name: "Jun", likes: 239, replies: 380, retweets: 250 },
    { name: "Jul", likes: 349, replies: 430, retweets: 210 },
  ]

  const followerData = [
    { name: "Jan", followers: 4000 },
    { name: "Feb", followers: 4200 },
    { name: "Mar", followers: 4500 },
    { name: "Apr", followers: 4800 },
    { name: "May", followers: 5100 },
    { name: "Jun", followers: 5400 },
    { name: "Jul", followers: 5800 },
  ]

  const impressionsData = [
    { name: "Jan", impressions: 12000 },
    { name: "Feb", impressions: 19000 },
    { name: "Mar", impressions: 15000 },
    { name: "Apr", impressions: 22000 },
    { name: "May", impressions: 18000 },
    { name: "Jun", impressions: 24000 },
    { name: "Jul", impressions: 21000 },
  ]

  const contentTypeData = [
    { name: "Tweets", value: 55 },
    { name: "Threads", value: 25 },
    { name: "Articles", value: 20 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  const topPerformingContent = [
    {
      id: 1,
      content:
        "Excited to announce our new AI-powered feature that helps you create better content in half the time! #ProductivityHack #AI",
      type: "tweet",
      engagement: 1250,
      impressions: 15000,
    },
    {
      id: 2,
      content: "Thread: 5 ways AI is transforming content creation for marketers in 2025...",
      type: "thread",
      engagement: 980,
      impressions: 12000,
    },
    {
      id: 3,
      content:
        "Check out our latest blog post on sustainable tech practices and how they're shaping the future of innovation.",
      type: "article",
      engagement: 1100,
      impressions: 18000,
    },
  ]

  // Function to render bar chart for engagement data
  const renderEngagementChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={engagementData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="likes" fill="#8884d8" />
        <Bar dataKey="replies" fill="#82ca9d" />
        <Bar dataKey="retweets" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )

  // Function to render line chart for follower data
  const renderFollowerChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={followerData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="followers" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )

  // Function to render pie chart for content type data
  const renderContentTypeChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={contentTypeData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
        >
          {contentTypeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Engagement Metrics</CardTitle>
          <CardDescription>Track likes, replies, and retweets over time.</CardDescription>
        </CardHeader>
        <CardContent>{renderEngagementChart()}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Follower Growth</CardTitle>
          <CardDescription>Monitor your follower count monthly.</CardDescription>
        </CardHeader>
        <CardContent>{renderFollowerChart()}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Content Type Distribution</CardTitle>
          <CardDescription>See how different types of content perform.</CardDescription>
        </CardHeader>
        <CardContent>{renderContentTypeChart()}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
          <CardDescription>Discover your most engaging content.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6">
            {topPerformingContent.map((content) => (
              <li key={content.id}>
                <strong>{content.content}</strong> - Type: {content.type}, Engagement: {content.engagement},
                Impressions: {content.impressions}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
