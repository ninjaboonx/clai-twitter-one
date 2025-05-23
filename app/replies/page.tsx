import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { ReplyManager } from "@/components/reply-manager"

export default function RepliesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reply Management"
        text="Manage and respond to mentions and replies with AI assistance."
      />
      <ReplyManager />
    </DashboardShell>
  )
}
