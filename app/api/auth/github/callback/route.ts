import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import {
  exchangeCodeForToken,
  getGitHubUserProfile,
  getGitHubUserEmails,
} from '@/lib/github-oauth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    // Handle OAuth errors
    if (error) {
      console.error('GitHub OAuth error:', error, errorDescription)
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/login?error=${encodeURIComponent(
          errorDescription || 'Authentication failed'
        )}`
      )
    }

    // Validate required parameters
    if (!code) {
      throw new Error('No authorization code provided')
    }

    if (!state) {
      throw new Error('No state parameter provided')
    }

    // Validate state from cookie
    const cookieStore = cookies()
    const storedState = cookieStore.get('github_oauth_state')?.value

    if (!storedState || storedState !== state) {
      throw new Error('Invalid state parameter')
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForToken(code)

    if (!tokens.access_token) {
      throw new Error('Failed to obtain access token')
    }

    // Get user profile and emails
    const [profile, emails] = await Promise.all([
      getGitHubUserProfile(tokens.access_token),
      getGitHubUserEmails(tokens.access_token),
    ])

    if (!profile.login) {
      throw new Error('Failed to get user profile')
    }

    // Get primary email
    const primaryEmail = emails.find((email: any) => email.primary)?.email

    // Create or update account
    const account = await db.githubAccount.upsert({
      where: { username: profile.login },
      create: {
        name: profile.name || profile.login,
        username: profile.login,
        email: primaryEmail,
        profileImage: profile.avatar_url,
        accessToken: tokens.access_token,
        scope: tokens.scope,
      },
      update: {
        name: profile.name || profile.login,
        email: primaryEmail,
        profileImage: profile.avatar_url,
        accessToken: tokens.access_token,
        scope: tokens.scope,
      },
    })

    // Create response with redirect
    const response = NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/settings/accounts?success=true&message=${encodeURIComponent(
        'Successfully connected GitHub account'
      )}`
    )

    // Set account info in cookie
    response.cookies.set('github_account_info', JSON.stringify({
      id: account.id,
      username: account.username,
      name: account.name,
      profileImage: account.profileImage,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    // Clear the OAuth state cookie
    response.cookies.delete('github_oauth_state')

    return response
  } catch (error) {
    console.error('Error in GitHub callback:', error)
    const errorMessage = error instanceof Error ? error.message : 'Authentication failed'
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/login?error=${encodeURIComponent(errorMessage)}`
    )
  }
} 