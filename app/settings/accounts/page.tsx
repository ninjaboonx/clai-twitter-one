import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { getConnectedAccounts } from "@/app/actions/twitter-accounts"
import { EnhancedTwitterAccounts } from "@/components/enhanced-twitter-accounts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Twitter } from "lucide-react"

export default async function AccountsSettingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const accounts = await getConnectedAccounts()
  const success = searchParams.success === "true"
  const error = searchParams.error as string | undefined

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Twitter Account Settings"
        text="Manage your connected Twitter accounts and authentication."
      />

      <Card>
        <CardHeader>
          <CardTitle>Connected Twitter Accounts</CardTitle>
          <CardDescription>Manage the Twitter accounts you've connected to X-AI Composer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <EnhancedTwitterAccounts accounts={accounts} autoVerifyInterval={60} />

          {accounts.length === 0 && (
            <div className="pt-4">
              <Button className="w-full" asChild>
                <a href="/api/auth/twitter">
                  <Twitter className="mr-2 h-4 w-4" />
                  Connect Twitter Account
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
