import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { ScheduleCalendar } from "@/components/schedule-calendar"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function SchedulePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Content Schedule" text="Plan and schedule your Twitter content.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Schedule New
        </Button>
      </DashboardHeader>
      <ScheduleCalendar />
    </DashboardShell>
  )
}
