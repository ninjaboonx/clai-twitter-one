import type React from "react"
import { cn } from "@/lib/utils"
import { MainNav } from "@/components/main-nav"
import { AccountSwitcher } from "@/components/account-switcher"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <AccountSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className={cn("flex flex-col gap-4", className)} {...props}>
          {children}
        </div>
      </div>
    </div>
  )
}
