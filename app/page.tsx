import { redirect } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { UpcomingPosts } from "@/components/upcoming-posts"
import { ContentIdeas } from "@/components/content-ideas"

export default function DashboardPage() {
  const user = {
    isLoggedIn: true, // This would be determined by your auth system
  }

  if (!user.isLoggedIn) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Manage your Twitter content and engagement in one place." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Overview className="col-span-3" />
        <UpcomingPosts className="md:col-span-2" />
        <ContentIdeas className="md:col-span-1" />
        <RecentActivity className="md:col-span-3" />
      </div>
    </DashboardShell>
  )
}
