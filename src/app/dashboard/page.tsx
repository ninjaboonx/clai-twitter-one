import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - CLAI',
  description: 'Manage your X accounts and content',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Connected Accounts
          </h3>
          <div className="mt-5">
            <div className="rounded-md bg-gray-50 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://via.placeholder.com/40"
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">@username1</h4>
                    <p className="text-sm text-gray-500">Personal Account</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Settings
                  </button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Followers</p>
                  <p className="font-medium text-gray-900">1.2K</p>
                </div>
                <div>
                  <p className="text-gray-500">Following</p>
                  <p className="font-medium text-gray-900">456</p>
                </div>
                <div>
                  <p className="text-gray-500">Posts</p>
                  <p className="font-medium text-gray-900">2.1K</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">API Quota</span>
                  <span className="text-sm text-gray-500">80%</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: '80%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Create New Post
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      AI-powered content creation
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a
                href="/content/new"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Create now
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Analytics Overview
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      Performance insights
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a
                href="/analytics"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                View analytics
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Scheduled Posts
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      Manage your queue
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a
                href="/content/scheduled"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                View schedule
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 