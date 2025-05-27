import { Metadata } from 'next'
import { UserLoginForm } from '@/components/user-login-form'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string; message?: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-[350px] p-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 text-primary"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <h1 className="text-2xl font-bold">Twitter Clone</h1>
          </div>
          <div className="w-full">
            <UserLoginForm />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
} 