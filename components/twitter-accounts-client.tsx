"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Twitter, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TwitterAccountsList } from "@/components/twitter-accounts-list"
import type { TwitterAccount } from "@/types/twitter"

interface TwitterAccountsClientProps {
  accounts: TwitterAccount[]
  success?: boolean
  error?: string
}

export function TwitterAccountsClient({ accounts, success, error }: TwitterAccountsClientProps) {
  return (
    <>
      {success && (
        <Alert
          variant="default"
          className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400"
        >
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Your Twitter account has been successfully connected.</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>
            {error === "oauth_failed"
              ? "Failed to initiate Twitter authentication. Please try again."
              : error === "oauth_callback_failed"
                ? "Failed to complete Twitter authentication. Please try again."
                : "An error occurred during authentication. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="accounts" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
          <TabsTrigger value="api">API Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Twitter Accounts</CardTitle>
              <CardDescription>Manage the Twitter accounts you've connected to X-AI Composer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TwitterAccountsList accounts={accounts} />

              <div className="pt-4">
                <Button className="w-full" asChild>
                  <a href="/api/auth/twitter">
                    <Twitter className="mr-2 h-4 w-4" />
                    Connect Twitter Account
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Twitter API Settings</CardTitle>
              <CardDescription>Configure your Twitter API credentials for authentication.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  We recommend using the OAuth authentication method above for most users. Manual API configuration is
                  only needed for advanced use cases.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" placeholder="Enter your Twitter API key" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-secret">API Secret</Label>
                <Input id="api-secret" type="password" placeholder="Enter your Twitter API secret" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="access-token">Access Token</Label>
                <Input id="access-token" placeholder="Enter your Twitter access token" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token-secret">Access Token Secret</Label>
                <Input id="token-secret" type="password" placeholder="Enter your Twitter token secret" />
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save API Settings</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>OAuth Configuration</CardTitle>
              <CardDescription>Configure OAuth settings for your Twitter Developer App.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oauth-callback">OAuth Callback URL</Label>
                <div className="flex">
                  <Input
                    id="oauth-callback"
                    value={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/twitter/callback`}
                    readOnly
                  />
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/twitter/callback`,
                      )
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add this URL to your Twitter Developer Portal as an authorized callback URL.
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 border-t px-6 py-4">
              <div className="space-y-2 w-full">
                <h4 className="font-medium text-sm">Twitter Developer Portal Setup</h4>
                <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                  <li>
                    Go to the{" "}
                    <a
                      href="https://developer.twitter.com/en/portal/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Twitter Developer Portal
                    </a>
                  </li>
                  <li>Create a new project and app (or use an existing one)</li>
                  <li>Set up User Authentication and enable OAuth 1.0a</li>
                  <li>Add the callback URL shown above</li>
                  <li>Set App permissions to "Read and Write"</li>
                  <li>Copy your API Key and Secret to the environment variables</li>
                </ol>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
