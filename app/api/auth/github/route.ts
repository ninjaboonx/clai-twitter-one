import { NextResponse } from 'next/server'
import { generateGitHubState, getGitHubAuthUrl } from '@/lib/github-oauth'

export async function GET() {
  try {
    const state = generateGitHubState()
    const url = getGitHubAuthUrl(state)

    // Store state in cookie for validation
    const response = NextResponse.json({ url })
    response.cookies.set('github_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Error initiating GitHub login:', error)
    return NextResponse.json(
      { error: 'Failed to initiate GitHub login' },
      { status: 500 }
    )
  }
} 