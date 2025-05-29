import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import {
  exchangeCodeForToken,
  getTwitterUserProfile,
  saveTwitterTokens,
} from '@/lib/twitter-oauth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    // Handle OAuth errors
    if (error) {
      console.error('Twitter OAuth error:', error, errorDescription)
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/login?error=${encodeURIComponent(
          errorDescription || 'Authentication failed'
        )}`
      )
    }

    if (!code) {
      throw new Error('No authorization code provided')
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForToken(code)

    // Get user profile
    const profile = await getTwitterUserProfile(tokens.access_token)

    // Create or update account
    const account = await db.twitterAccount.upsert({
      where: { username: profile.data.username },
      create: {
        name: profile.data.name,
        username: profile.data.username,
        profileImage: profile.data.profile_image_url,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        scope: tokens.scope,
      },
      update: {
        name: profile.data.name,
        profileImage: profile.data.profile_image_url,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        scope: tokens.scope,
      },
    })

    // Create response with redirect
    const response = NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/settings/accounts?success=true&message=${encodeURIComponent(
        'Successfully connected Twitter account'
      )}`
    )

    // Set account info in cookie
    response.cookies.set('twitter_account_info', JSON.stringify({
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

    return response
  } catch (error) {
    console.error('Error in Twitter callback:', error)
    const errorMessage = error instanceof Error ? error.message : 'Authentication failed'
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/login?error=${encodeURIComponent(errorMessage)}`
    )
  }
}
