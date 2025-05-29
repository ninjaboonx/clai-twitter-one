import { db } from './db'

const TWITTER_API_URL = 'https://api.twitter.com/2'
const TWITTER_OAUTH_URL = 'https://twitter.com/i/oauth2'

export const twitterOAuthConfig = {
  clientId: process.env.TWITTER_CLIENT_ID!,
  clientSecret: process.env.TWITTER_CLIENT_SECRET!,
  redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/twitter/callback`,
  scope: 'tweet.read tweet.write users.read offline.access',
}

export async function getTwitterAuthUrl() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: twitterOAuthConfig.clientId,
    redirect_uri: twitterOAuthConfig.redirectUri,
    scope: twitterOAuthConfig.scope,
    state: generateRandomState(),
    code_challenge: await generateCodeChallenge(),
    code_challenge_method: 'S256',
  })

  return `${TWITTER_OAUTH_URL}/authorize?${params.toString()}`
}

export async function exchangeCodeForToken(code: string) {
  const params = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    client_id: twitterOAuthConfig.clientId,
    redirect_uri: twitterOAuthConfig.redirectUri,
    code_verifier: 'challenge', // In production, store and retrieve the code verifier
  })

  const response = await fetch(`${TWITTER_OAUTH_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${twitterOAuthConfig.clientId}:${twitterOAuthConfig.clientSecret}`
      ).toString('base64')}`,
    },
    body: params.toString(),
  })

  if (!response.ok) {
    throw new Error('Failed to exchange code for token')
  }

  return response.json()
}

export async function refreshTwitterToken(refreshToken: string) {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: twitterOAuthConfig.clientId,
  })

  const response = await fetch(`${TWITTER_OAUTH_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${twitterOAuthConfig.clientId}:${twitterOAuthConfig.clientSecret}`
      ).toString('base64')}`,
    },
    body: params.toString(),
  })

  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  return response.json()
}

export async function getTwitterUserProfile(accessToken: string) {
  const response = await fetch(`${TWITTER_API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user profile')
  }

  return response.json()
}

// Utility functions
function generateRandomState() {
  return Math.random().toString(36).substring(2, 15)
}

async function generateCodeChallenge() {
  // In production, implement proper PKCE flow
  return 'challenge'
}

// Token management
export async function saveTwitterTokens(
  userId: string,
  tokens: {
    access_token: string
    refresh_token: string
    expires_in: number
    scope: string
  }
) {
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000)

  await db.twitterAccount.update({
    where: { id: userId },
    data: {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt,
      scope: tokens.scope,
    },
  })
}

export async function getValidTwitterToken(userId: string) {
  const account = await db.twitterAccount.findUnique({
    where: { id: userId },
  })

  if (!account) {
    throw new Error('Account not found')
  }

  // Check if token needs refresh
  if (account.expiresAt && account.expiresAt < new Date()) {
    if (!account.refreshToken) {
      throw new Error('No refresh token available')
    }

    const tokens = await refreshTwitterToken(account.refreshToken)
    await saveTwitterTokens(userId, tokens)
    return tokens.access_token
  }

  return account.accessToken
} 