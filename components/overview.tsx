"use client"

import type React from "react"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const data = [
  {
    name: "Jan",
    total: 1200,
  },
  {
    name: "Feb",
    total: 1900,
  },
  {
    name: "Mar",
    total: 2300,
  },
  {
    name: "Apr",
    total: 3200,
  },
  {
    name: "May",
    total: 4100,
  },
  {
    name: "Jun",
    total: 3800,
  },
  {
    name: "Jul",
    total: 4300,
  },
]

interface OverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Overview({ className, ...props }: OverviewProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>Track your engagement, followers, and content performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="engagement">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="impressions">Impressions</TabsTrigger>
          </TabsList>
          <TabsContent value="engagement" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="followers" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="impressions" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
