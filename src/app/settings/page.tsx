import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import SettingsForm from '@/components/SettingsForm'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Settings - CLAI',
  description: 'Manage your account settings and preferences',
}

export default async function SettingsPage() {
  const session = await getServerSession()

  if (!session?.user?.email) {
    redirect('/')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { settings: true },
  })

  if (!user) {
    redirect('/')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Account Settings
          </h3>
          <div className="mt-5">
            <SettingsForm
              initialData={{
                name: user.name || '',
                email: user.email || '',
                timezone: user.timezone,
                notifications: {
                  email: user.settings?.emailNotifications ?? true,
                  contentAlerts: user.settings?.contentAlerts ?? true,
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Connected Accounts
          </h3>
          <div className="mt-5">
            <div className="space-y-4">
              {user.accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.image || 'https://via.placeholder.com/40'}
                      alt=""
                    />
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        {account.providerAccountId}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {account.provider.charAt(0).toUpperCase() + account.provider.slice(1)} Account
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Disconnect
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            API Settings
          </h3>
          <div className="mt-5">
            {user.settings && user.settings.apiQuotaUsed > user.settings.apiQuota * 0.8 && (
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      API Usage Warning
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        You are approaching your API rate limit. Consider upgrading your plan
                        for higher limits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">API Quota</span>
                <span className="text-sm text-gray-500">
                  {user.settings ? Math.round((user.settings.apiQuotaUsed / user.settings.apiQuota) * 100) : 0}%
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{
                    width: `${user.settings ? (user.settings.apiQuotaUsed / user.settings.apiQuota) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 