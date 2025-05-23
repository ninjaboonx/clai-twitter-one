"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronLeft, ChevronRight, Edit, Trash2, Copy, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ScheduleCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

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
    {
      id: 4,
      content: "We're hosting a live webinar next week on 'AI Ethics in Business' - register now to secure your spot!",
      scheduledFor: "2025-05-21T11:00:00",
      type: "tweet",
      account: "@acmecorp",
    },
    {
      id: 5,
      content:
        "Just published: Our comprehensive guide to content marketing in 2025. Learn the strategies that are working right now.",
      scheduledFor: "2025-05-22T15:45:00",
      type: "article",
      account: "@johndoe",
    },
  ]

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const days = daysInMonth(year, month)
    const firstDay = firstDayOfMonth(year, month)

    const calendarDays = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-24 border border-border p-1"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month, day)
      const dateString = date.toISOString().split("T")[0]

      // Find posts scheduled for this day
      const postsForDay = scheduledPosts.filter((post) => {
        const postDate = new Date(post.scheduledFor)
        return postDate.toISOString().split("T")[0] === dateString
      })

      calendarDays.push(
        <div key={day} className="min-h-24 border border-border p-1">
          <div className="flex justify-between items-start">
            <span
              className={`text-sm font-medium ${isToday(date) ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center" : ""}`}
            >
              {day}
            </span>
            {postsForDay.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {postsForDay.length}
              </Badge>
            )}
          </div>
          <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
            {postsForDay.map((post) => {
              const postTime = new Date(post.scheduledFor).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
              return (
                <div key={post.id} className="text-xs p-1 rounded bg-muted flex justify-between items-center">
                  <div className="truncate flex-1">
                    <span className="font-medium">{postTime}</span> - {post.type}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )
            })}
          </div>
        </div>,
      )
    }

    return calendarDays
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const renderWeekView = () => {
    // Implementation for week view would go here
    return <div className="text-center p-8">Week view implementation would go here</div>
  }

  const renderDayView = () => {
    // Implementation for day view would go here
    return <div className="text-center p-8">Day view implementation would go here</div>
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Today
            </Button>
            <Select value={view} onValueChange={(value: "month" | "week" | "day") => setView(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {view === "month" && (
          <>
            <div className="grid grid-cols-7 gap-0 mb-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-medium text-sm py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0">{renderCalendarDays()}</div>
          </>
        )}

        {view === "week" && renderWeekView()}

        {view === "day" && renderDayView()}

        <div className="mt-6 flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
            <span className="text-sm">Tweet</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm">Thread</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Article</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
