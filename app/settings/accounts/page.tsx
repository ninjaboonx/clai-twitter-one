import { Suspense } from 'react'
import { TwitterAccountsList } from '@/components/twitter-accounts-list'
import { DashboardShell } from '@/components/dashboard-shell'
import { DashboardHeader } from '@/components/dashboard-header'
import { TwitterAccountsClient } from '@/components/twitter-accounts-client'
import { ErrorBoundaryClient } from '@/components/ErrorBoundaryClient'
import { getTwitterAccounts } from '@/app/actions/twitter-accounts'

function LoadingState() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export default async function SettingsAccountsPage() {
  const accounts = await getTwitterAccounts()

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Twitter Accounts"
        text="Manage your connected Twitter accounts and their settings."
      />
      <div className="grid gap-8">
        <ErrorBoundaryClient>
          <Suspense fallback={<LoadingState />}>
            <TwitterAccountsClient accounts={accounts} />
          </Suspense>
        </ErrorBoundaryClient>
      </div>
    </DashboardShell>
  )
}