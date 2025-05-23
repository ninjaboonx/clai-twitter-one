"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Trash2, RefreshCw, AlertCircle, CheckCircle2, Shield } from "lucide-react"
import { removeTwitterAccount, verifyTwitterCredentials } from "@/app/actions/twitter-accounts"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/toast"
import type { TwitterAccount } from "@/types/twitter"

interface TwitterAccountsListProps {
  accounts: TwitterAccount[]
}

export function TwitterAccountsList({ accounts }: TwitterAccountsListProps) {
  const [isVerifying, setIsVerifying] = useState<Record<string, boolean>>({})
  const [isRemoving, setIsRemoving] = useState<Record<string, boolean>>({})
  const [verificationStatus, setVerificationStatus] = useState<Record<string, "verified" | "failed" | "unknown">>({})
  const { toast } = useToast()

  const handleVerifyCredentials = async (accountId: string) => {
    setIsVerifying({ ...isVerifying, [accountId]: true })
    try {
      const result = await verifyTwitterCredentials(accountId)
      if (result.success) {
        toast({
          title: "Verification successful",
          description: "Your Twitter credentials are valid and working.",
          variant: "default",
        })
        setVerificationStatus({ ...verificationStatus, [accountId]: "verified" })
      } else {
        toast({
          title: "Verification failed",
          description: result.message || "Unable to verify your Twitter credentials.",
          variant: "destructive",
        })
        setVerificationStatus({ ...verificationStatus, [accountId]: "failed" })
      }
    } catch (error) {
      toast({
        title: "Verification error",
        description: "An error occurred while verifying your Twitter credentials.",
        variant: "destructive",
      })
      setVerificationStatus({ ...verificationStatus, [accountId]: "failed" })
    } finally {
      setIsVerifying({ ...isVerifying, [accountId]: false })
    }
  }

  const handleRemoveAccount = async (accountId: string) => {
    setIsRemoving({ ...isRemoving, [accountId]: true })
    try {
      const result = await removeTwitterAccount(accountId)
      if (result.success) {
        toast({
          title: "Account removed",
          description: "Your Twitter account has been disconnected successfully.",
          variant: "default",
        })
        // Refresh the page to update the UI
        window.location.reload()
      } else {
        toast({
          title: "Removal failed",
          description: "Failed to remove your Twitter account. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Removal error",
        description: "An error occurred while removing your Twitter account.",
        variant: "destructive",
      })
    } finally {
      setIsRemoving({ ...isRemoving, [accountId]: false })
    }
  }

  if (accounts.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <AlertCircle className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-4 text-sm font-semibold">No Twitter Accounts Connected</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You haven't connected any Twitter accounts yet. Click the button below to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <div key={account.id} className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={account.profileImage || "/placeholder.svg"} alt={account.username} />
                <AvatarFallback>{account.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{account.name}</p>
                <p className="text-xs text-muted-foreground">@{account.username}</p>
              </div>
              <div className="ml-4 flex items-center">
                {verificationStatus[account.id] === "verified" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-600 dark:text-green-400">Verified</span>
                  </>
                ) : verificationStatus[account.id] === "failed" ? (
                  <>
                    <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-xs text-red-600 dark:text-red-400">Verification Failed</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">Connected</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVerifyCredentials(account.id)}
                disabled={isVerifying[account.id]}
              >
                {isVerifying[account.id] ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Verify
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove Twitter Account</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to disconnect @{account.username}? This will remove all access to this
                      Twitter account from X-AI Composer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleRemoveAccount(account.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isRemoving[account.id] ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Removing...
                        </>
                      ) : (
                        "Remove Account"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
