"use client"

import { useState, useEffect, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Shield,
  ChevronDown,
  ChevronUp,
  Clock,
  AlertTriangle,
  Link2,
  Settings,
  Activity,
} from "lucide-react"
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/toast"
import type { TwitterAccount, BatchOperation, AccountStatus } from "@/types/twitter"

interface EnhancedTwitterAccountsProps {
  accounts: TwitterAccount[]
  autoVerifyInterval?: number // in minutes, default 60
}

export function EnhancedTwitterAccounts({
  accounts: initialAccounts,
  autoVerifyInterval = 60,
}: EnhancedTwitterAccountsProps) {
  const [accounts, setAccounts] = useState<TwitterAccount[]>(initialAccounts)
  const [isVerifying, setIsVerifying] = useState<Record<string, boolean>>({})
  const [isRemoving, setIsRemoving] = useState<Record<string, boolean>>({})
  const [expandedAccounts, setExpandedAccounts] = useState<Record<string, boolean>>({})
  const [selectedAccounts, setSelectedAccounts] = useState<Record<string, boolean>>({})
  const [isBatchProcessing, setIsBatchProcessing] = useState(false)
  const [lastAutoVerify, setLastAutoVerify] = useState<Date | null>(null)
  const { toast } = useToast()

  // Function to handle automatic verification
  const runAutoVerification = useCallback(async () => {
    const now = new Date()
    setLastAutoVerify(now)

    // Only auto-verify accounts that haven't been verified in the last hour
    const accountsToVerify = accounts.filter((account) => {
      if (!account.lastVerified) return true

      const lastVerified = new Date(account.lastVerified)
      const hoursSinceVerification = (now.getTime() - lastVerified.getTime()) / (1000 * 60 * 60)
      return hoursSinceVerification >= 1
    })

    if (accountsToVerify.length === 0) return

    toast({
      title: "Auto-verification started",
      description: `Verifying ${accountsToVerify.length} account(s) in the background.`,
    })

    // Verify each account
    for (const account of accountsToVerify) {
      try {
        await verifyTwitterCredentials(account.id)
        // We'll update the UI in a real implementation
      } catch (error) {
        console.error(`Auto-verification failed for account ${account.username}:`, error)
      }
    }

    // In a real implementation, we would fetch updated accounts here
    toast({
      title: "Auto-verification complete",
      description: `Verified ${accountsToVerify.length} account(s).`,
    })
  }, [accounts, toast])

  // Set up automatic verification interval
  useEffect(() => {
    if (autoVerifyInterval <= 0 || accounts.length === 0) return

    // Run initial verification
    runAutoVerification()

    // Set up interval for future verifications
    const intervalId = setInterval(runAutoVerification, autoVerifyInterval * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [accounts.length, autoVerifyInterval, runAutoVerification])

  // Handle single account verification
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

        // Update the account in our local state
        setAccounts(
          accounts.map((account) =>
            account.id === accountId
              ? {
                  ...account,
                  lastVerified: new Date().toISOString(),
                  status: "active",
                }
              : account,
          ),
        )
      } else {
        toast({
          title: "Verification failed",
          description: result.message || "Unable to verify your Twitter credentials.",
          variant: "destructive",
        })

        // Update the account status
        setAccounts(
          accounts.map((account) =>
            account.id === accountId
              ? {
                  ...account,
                  lastVerified: new Date().toISOString(),
                  status: "expired",
                }
              : account,
          ),
        )
      }
    } catch (error) {
      toast({
        title: "Verification error",
        description: "An error occurred while verifying your Twitter credentials.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying({ ...isVerifying, [accountId]: false })
    }
  }

  // Handle single account removal
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

        // Remove the account from our local state
        setAccounts(accounts.filter((account) => account.id !== accountId))
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

  // Handle batch operations
  const handleBatchOperation = async (operation: BatchOperation) => {
    const selectedAccountIds = Object.entries(selectedAccounts)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id)

    if (selectedAccountIds.length === 0) {
      toast({
        title: "No accounts selected",
        description: "Please select at least one account to perform this operation.",
        variant: "destructive",
      })
      return
    }

    setIsBatchProcessing(true)

    try {
      toast({
        title: `Batch ${operation} started`,
        description: `Processing ${selectedAccountIds.length} account(s)...`,
      })

      if (operation === "verify") {
        // Verify all selected accounts
        for (const accountId of selectedAccountIds) {
          await verifyTwitterCredentials(accountId)
        }

        toast({
          title: "Batch verification complete",
          description: `Verified ${selectedAccountIds.length} account(s).`,
        })
      } else if (operation === "remove") {
        // Remove all selected accounts
        for (const accountId of selectedAccountIds) {
          await removeTwitterAccount(accountId)
        }

        // Remove accounts from local state
        setAccounts(accounts.filter((account) => !selectedAccountIds.includes(account.id)))

        toast({
          title: "Batch removal complete",
          description: `Removed ${selectedAccountIds.length} account(s).`,
        })
      } else if (operation === "refresh") {
        // Refresh account details for all selected accounts
        for (const accountId of selectedAccountIds) {
          // This would be implemented in a real app
          // await refreshAccountDetails(accountId);
        }

        toast({
          title: "Batch refresh complete",
          description: `Refreshed details for ${selectedAccountIds.length} account(s).`,
        })
      }

      // Clear selections after batch operation
      setSelectedAccounts({})
    } catch (error) {
      toast({
        title: `Batch ${operation} failed`,
        description: "An error occurred during the batch operation.",
        variant: "destructive",
      })
    } finally {
      setIsBatchProcessing(false)
    }
  }

  // Handle account reconnection
  const handleReconnectAccount = async (accountId: string) => {
    try {
      // In a real implementation, this would redirect to Twitter OAuth
      toast({
        title: "Reconnecting account",
        description: "Redirecting to Twitter for authentication...",
      })

      // Simulate reconnection for demo purposes
      setTimeout(() => {
        // Update the account status
        setAccounts(
          accounts.map((account) =>
            account.id === accountId
              ? {
                  ...account,
                  lastVerified: new Date().toISOString(),
                  status: "active",
                }
              : account,
          ),
        )

        toast({
          title: "Account reconnected",
          description: "Your Twitter account has been successfully reconnected.",
        })
      }, 2000)
    } catch (error) {
      toast({
        title: "Reconnection failed",
        description: "Failed to reconnect your Twitter account. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Toggle account expansion
  const toggleAccountExpansion = (accountId: string) => {
    setExpandedAccounts({
      ...expandedAccounts,
      [accountId]: !expandedAccounts[accountId],
    })
  }

  // Toggle account selection
  const toggleAccountSelection = (accountId: string) => {
    setSelectedAccounts({
      ...selectedAccounts,
      [accountId]: !selectedAccounts[accountId],
    })
  }

  // Toggle all account selections
  const toggleAllAccounts = () => {
    const allSelected = accounts.every((account) => selectedAccounts[account.id])

    if (allSelected) {
      // Deselect all
      setSelectedAccounts({})
    } else {
      // Select all
      const newSelectedAccounts: Record<string, boolean> = {}
      accounts.forEach((account) => {
        newSelectedAccounts[account.id] = true
      })
      setSelectedAccounts(newSelectedAccounts)
    }
  }

  // Get status badge color
  const getStatusColor = (status?: AccountStatus) => {
    switch (status) {
      case "active":
        return "text-green-500"
      case "expired":
        return "text-red-500"
      case "rate_limited":
        return "text-yellow-500"
      case "revoked":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  // Get status badge text
  const getStatusText = (status?: AccountStatus) => {
    switch (status) {
      case "active":
        return "Active"
      case "expired":
        return "Expired"
      case "rate_limited":
        return "Rate Limited"
      case "revoked":
        return "Revoked"
      default:
        return "Unknown"
    }
  }

  // Get status badge icon
  const getStatusIcon = (status?: AccountStatus) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "expired":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "rate_limited":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "revoked":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Shield className="h-4 w-4 text-muted-foreground" />
    }
  }

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never"

    const date = new Date(dateString)
    return date.toLocaleString()
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
    <div className="space-y-6">
      {/* Batch operations toolbar */}
      <div className="flex items-center justify-between bg-muted/50 rounded-md p-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={accounts.length > 0 && accounts.every((account) => selectedAccounts[account.id])}
            onCheckedChange={toggleAllAccounts}
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            Select All
          </label>
          <span className="text-xs text-muted-foreground">
            {Object.values(selectedAccounts).filter(Boolean).length} of {accounts.length} selected
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBatchOperation("verify")}
                  disabled={isBatchProcessing || Object.values(selectedAccounts).filter(Boolean).length === 0}
                >
                  {isBatchProcessing ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  <span className="sr-only md:not-sr-only md:ml-2">Verify Selected</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Verify selected accounts</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBatchOperation("refresh")}
                  disabled={isBatchProcessing || Object.values(selectedAccounts).filter(Boolean).length === 0}
                >
                  <Activity className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:ml-2">Refresh Details</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh account details</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <AlertDialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                      disabled={isBatchProcessing || Object.values(selectedAccounts).filter(Boolean).length === 0}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">Remove Selected</span>
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Remove selected accounts</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove Selected Accounts</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to disconnect {Object.values(selectedAccounts).filter(Boolean).length} Twitter
                  account(s)? This will remove all access to these accounts from X-AI Composer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleBatchOperation("remove")}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isBatchProcessing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Removing...
                    </>
                  ) : (
                    "Remove Accounts"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Auto-verification status */}
      {lastAutoVerify && (
        <div className="text-xs text-muted-foreground flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Last auto-verification: {lastAutoVerify.toLocaleString()}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 ml-2"
            onClick={runAutoVerification}
            disabled={isBatchProcessing}
          >
            Run Now
          </Button>
        </div>
      )}

      {/* Accounts list */}
      <div className="space-y-4">
        {accounts.map((account) => (
          <Collapsible
            key={account.id}
            open={expandedAccounts[account.id]}
            onOpenChange={() => toggleAccountExpansion(account.id)}
            className="rounded-md border"
          >
            <div className="p-4">
              <div className="flex items-center">
                <Checkbox
                  id={`select-${account.id}`}
                  checked={selectedAccounts[account.id] || false}
                  onCheckedChange={() => toggleAccountSelection(account.id)}
                  className="mr-4"
                />

                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={account.profileImage || "/placeholder.svg"} alt={account.username} />
                  <AvatarFallback>{account.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium">{account.name}</p>
                    <p className="text-xs text-muted-foreground ml-2">@{account.username}</p>
                    <div className="ml-4 flex items-center">
                      {getStatusIcon(account.status)}
                      <span className={`text-xs ml-1 ${getStatusColor(account.status)}`}>
                        {getStatusText(account.status)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span className="flex items-center mr-4">
                      <Clock className="h-3 w-3 mr-1" />
                      Last verified: {formatDate(account.lastVerified)}
                    </span>

                    {account.health && (
                      <span className="flex items-center">
                        <Activity className="h-3 w-3 mr-1" />
                        Health: {account.health.score}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {account.status === "expired" || account.status === "revoked" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReconnectAccount(account.id)}
                      className="text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Link2 className="mr-2 h-4 w-4" />
                      Reconnect
                    </Button>
                  ) : (
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
                  )}

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

                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {expandedAccounts[account.id] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
            </div>

            <CollapsibleContent>
              <div className="border-t p-4">
                <Tabs defaultValue="health">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="health">Account Health</TabsTrigger>
                    <TabsTrigger value="limits">Rate Limits</TabsTrigger>
                    <TabsTrigger value="permissions">Permissions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="health" className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Health Score</CardTitle>
                          <CardDescription>Overall account health</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-center h-24">
                            <div className="relative w-24 h-24">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold">{account.health?.score || 85}%</span>
                              </div>
                              {/* This would be a circular progress bar in a real implementation */}
                              <div className="absolute inset-0 rounded-full border-8 border-green-500 opacity-25"></div>
                              <div
                                className="absolute inset-0 rounded-full border-8 border-green-500"
                                style={{
                                  clipPath: `polygon(0 0, 100% 0, 100% ${account.health?.score || 85}%, 0 ${account.health?.score || 85}%)`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">API Usage</CardTitle>
                          <CardDescription>Current API consumption</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Daily</span>
                                <span className="text-sm font-medium">{account.health?.apiUsage || 45}%</span>
                              </div>
                              <Progress value={account.health?.apiUsage || 45} />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Monthly</span>
                                <span className="text-sm font-medium">
                                  {account.health?.apiUsage ? Math.round(account.health.apiUsage * 0.8) : 36}%
                                </span>
                              </div>
                              <Progress
                                value={account.health?.apiUsage ? Math.round(account.health.apiUsage * 0.8) : 36}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Activity Timeline</CardTitle>
                        <CardDescription>Recent account activity</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="mr-2 mt-0.5">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Account verified</p>
                              <p className="text-xs text-muted-foreground">{formatDate(account.lastVerified)}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="mr-2 mt-0.5">
                              <Activity className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Posted 3 tweets</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(Date.now() - 86400000).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="mr-2 mt-0.5">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Approaching rate limit</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(Date.now() - 172800000).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="limits" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">API Rate Limits</CardTitle>
                        <CardDescription>Current Twitter API usage and limits</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Overall</span>
                              <span className="text-sm font-medium">
                                {account.rateLimit?.remaining || 180} / {account.rateLimit?.limit || 300}
                              </span>
                            </div>
                            <Progress
                              value={
                                account.rateLimit ? (account.rateLimit.remaining / account.rateLimit.limit) * 100 : 60
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              Resets in:{" "}
                              {account.rateLimit?.reset
                                ? new Date(account.rateLimit.reset).toLocaleTimeString()
                                : "45 minutes"}
                            </p>
                          </div>

                          <div className="border rounded-md">
                            <div className="grid grid-cols-3 gap-4 p-3 border-b text-xs font-medium">
                              <div>Endpoint</div>
                              <div>Remaining</div>
                              <div>Reset</div>
                            </div>

                            <div className="divide-y">
                              <div className="grid grid-cols-3 gap-4 p-3 text-xs">
                                <div>/tweets</div>
                                <div>75 / 100</div>
                                <div>15 minutes</div>
                              </div>

                              <div className="grid grid-cols-3 gap-4 p-3 text-xs">
                                <div>/users</div>
                                <div>45 / 75</div>
                                <div>30 minutes</div>
                              </div>

                              <div className="grid grid-cols-3 gap-4 p-3 text-xs">
                                <div>/search</div>
                                <div>60 / 125</div>
                                <div>45 minutes</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-muted/50 px-6 py-3">
                        <p className="text-xs text-muted-foreground">
                          <AlertCircle className="h-3 w-3 inline-block mr-1" />
                          Rate limits are refreshed every 15 minutes by Twitter.
                        </p>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="permissions" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Account Permissions</CardTitle>
                        <CardDescription>Access levels granted to this application</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-md border p-3">
                              <div className="flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                <span className="text-sm font-medium">Read</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Access to read tweets and user information
                              </p>
                            </div>

                            <div className="rounded-md border p-3">
                              <div className="flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                <span className="text-sm font-medium">Write</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Ability to post tweets and reply to messages
                              </p>
                            </div>

                            <div className="rounded-md border p-3">
                              <div className="flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                <span className="text-sm font-medium">Direct Messages</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Access to read and send direct messages
                              </p>
                            </div>

                            <div className="rounded-md border p-3">
                              <div className="flex items-center">
                                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                                <span className="text-sm font-medium">Admin</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Administrative access to account settings
                              </p>
                            </div>
                          </div>

                          <div className="rounded-md bg-muted p-3">
                            <p className="text-xs">
                              <span className="font-medium">OAuth Scope:</span> tweet.read tweet.write users.read
                              dm.read dm.write
                            </p>
                            <p className="text-xs mt-1">
                              <span className="font-medium">App Permissions:</span> Read and Write
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-muted/50 px-6 py-3">
                        <div className="flex items-center justify-between w-full">
                          <p className="text-xs text-muted-foreground">
                            <Shield className="h-3 w-3 inline-block mr-1" />
                            Permissions granted on: {new Date(Date.now() - 2592000000).toLocaleDateString()}
                          </p>
                          <Button variant="outline" size="sm" className="h-7">
                            <Settings className="h-3 w-3 mr-1" />
                            Manage Permissions
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}
