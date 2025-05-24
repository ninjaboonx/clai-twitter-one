import { Suspense } from 'react'
import { TwitterAccountsList } from '@/components/twitter-accounts-list'
import { DashboardShell } from '@/components/dashboard-shell'
import { DashboardHeader } from '@/components/dashboard-header'
import { TwitterAccountsClient } from '@/components/twitter-accounts-client'
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}

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

export default function SettingsAccountsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Twitter Accounts"
        text="Manage your connected Twitter accounts and their settings."
      />
      <div className="grid gap-8">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            window.location.reload()
          }}
        >
          <Suspense fallback={<LoadingState />}>
            <TwitterAccountsClient>
              <TwitterAccountsList />
            </TwitterAccountsClient>
          </Suspense>
        </ErrorBoundary>
      </div>
    </DashboardShell>
  )
}