import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">CLAI</h1>
          <h2 className="mt-2 text-xl text-gray-600">AI-Powered X Management</h2>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Connect with X/Twitter Account
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-sm text-gray-600">Secure OAuth 2.0 Authentication</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-sm text-gray-600">We never store your password</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-sm text-gray-600">Revoke access anytime from your X settings</span>
              </div>
            </div>

            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="text-sm font-medium text-gray-900">AI Content Creation</h3>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-sm font-medium text-gray-900">Analytics</h3>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">⏰</div>
            <h3 className="text-sm font-medium text-gray-900">Smart Scheduling</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
