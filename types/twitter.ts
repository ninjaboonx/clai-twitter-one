export type TwitterAccount = {
  id: string
  username: string
  name: string
  profileImage: string
  accessToken: string
  accessTokenSecret: string
  lastVerified?: string // Timestamp of last verification
  status?: AccountStatus
  health?: AccountHealth
  rateLimit?: RateLimitInfo
}

export type AccountStatus = "active" | "expired" | "rate_limited" | "revoked" | "unknown"

export type AccountHealth = {
  score: number // 0-100
  apiUsage: number // Percentage of API usage
  lastActivity: string // Timestamp
  issuesCount: number
}

export type RateLimitInfo = {
  remaining: number
  limit: number
  reset: string // Timestamp
  endpoints: {
    [key: string]: {
      remaining: number
      limit: number
      reset: string
    }
  }
}

export type BatchOperation = "verify" | "remove" | "refresh"
