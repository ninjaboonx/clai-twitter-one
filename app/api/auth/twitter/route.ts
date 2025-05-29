import { NextResponse } from 'next/server'
import { getTwitterAuthUrl } from '@/lib/twitter-oauth'

export async function GET() {
  try {
    const authUrl = await getTwitterAuthUrl()
    return NextResponse.json({ url: authUrl })
  } catch (error) {
    console.error('Error generating Twitter auth URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate Twitter auth URL' },
      { status: 500 }
    )
  }
}
