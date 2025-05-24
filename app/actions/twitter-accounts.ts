"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import type { TwitterAccount, AccountStatus, RateLimitInfo, AccountHealth } from "@/types/twitter"
import { db } from '@/lib/db'

// Get all connected Twitter accounts
export async function getConnectedAccounts(): Promise<TwitterAccount[]> {
  try {
    // In a real app, you would fetch this from a database
    // For demo purposes, we'll use cookies
    const cookieStore = cookies()
    const accountInfoCookie = cookieStore.get("twitter_account_info")

    if (!accountInfoCookie?.value) {
      return []
    }

    // Parse the account info
    const accountInfo = JSON.parse(accountInfoCookie.value) as TwitterAccount

    // Add demo data for the enhanced features
    const enhancedAccount: TwitterAccount = {
      ...accountInfo,
      lastVerified: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      status: "active",
      health: {
        score: 85,
        apiUsage: 45,
        lastActivity: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        issuesCount: 0,
      },
      rateLimit: {
        remaining: 180,
        limit: 300,
        reset: new Date(Date.now() + 2700000).toISOString(), // 45 minutes from now
        endpoints: {
          "/tweets": {
            remaining: 75,
            limit: 100,
            reset: new Date(Date.now() + 900000).toISOString(), // 15 minutes from now
          },
          "/users": {
            remaining: 45,
            limit: 75,
            reset: new Date(Date.now() + 1800000).toISOString(), // 30 minutes from now
          },
          "/search": {
            remaining: 60,
            limit: 125,
            reset: new Date(Date.now() + 2700000).toISOString(), // 45 minutes from now
          },
        },
      },
    }

    // Return as an array (in a real app, you might have multiple accounts)
    return [enhancedAccount]
  } catch (error) {
    console.error("Error getting connected accounts:", error)
    return []
  }
}

// Remove a connected Twitter account
export async function removeTwitterAccount(accountId: string): Promise<{ success: boolean }> {
  try {
    await db.twitterAccount.delete({
      where: { id: accountId },
    })
    return { success: true }
  } catch (error) {
    console.error('Error removing Twitter account:', error)
    return { success: false, message: 'Failed to remove account' }
  }
}

// Verify Twitter credentials
export async function verifyTwitterCredentials(accountId: string): Promise<{ success: boolean; message: string }> {
  try {
    // TODO: Implement Twitter API verification
    return { success: true }
  } catch (error) {
    console.error('Error verifying Twitter credentials:', error)
    return { success: false, message: 'Failed to verify credentials' }
  }
}

// Get detailed account information
export async function getAccountDetails(accountId: string): Promise<{
  success: boolean
  data?: {
    status: AccountStatus
    health: AccountHealth
    rateLimit: RateLimitInfo
  }
  message?: string
}> {
  try {
    // In a real app, you would fetch this from the Twitter API
    // For demo purposes, we'll return mock data

    return {
      success: true,
      data: {
        status: "active",
        health: {
          score: 85,
          apiUsage: 45,
          lastActivity: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          issuesCount: 0,
        },
        rateLimit: {
          remaining: 180,
          limit: 300,
          reset: new Date(Date.now() + 2700000).toISOString(), // 45 minutes from now
          endpoints: {
            "/tweets": {
              remaining: 75,
              limit: 100,
              reset: new Date(Date.now() + 900000).toISOString(), // 15 minutes from now
            },
            "/users": {
              remaining: 45,
              limit: 75,
              reset: new Date(Date.now() + 1800000).toISOString(), // 30 minutes from now
            },
            "/search": {
              remaining: 60,
              limit: 125,
              reset: new Date(Date.now() + 2700000).toISOString(), // 45 minutes from now
            },
          },
        },
      },
    }
  } catch (error) {
    console.error("Error getting account details:", error)
    return {
      success: false,
      message: "Failed to fetch account details",
    }
  }
}

// Reconnect Twitter account
export async function reconnectAccount(accountId: string): Promise<{ success: boolean; message: string }> {
  try {
    // In a real app, this would redirect to Twitter OAuth
    // For demo purposes, we'll just return success

    return {
      success: true,
      message: "Account reconnection initiated",
    }
  } catch (error) {
    console.error("Error reconnecting account:", error)
    return {
      success: false,
      message: "Failed to initiate account reconnection",
    }
  }
}

export async function getTwitterAccounts(): Promise<TwitterAccount[]> {
  try {
    const accounts = await db.twitterAccount.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return accounts
  } catch (error) {
    console.error('Error fetching Twitter accounts:', error)
    return []
  }
}
