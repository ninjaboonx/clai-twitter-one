import { type NextRequest, NextResponse } from "next/server"
import { OAuth } from "oauth"

// Twitter OAuth configuration
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || ""
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || ""
const CALLBACK_URL = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/twitter/callback`

// Create OAuth instance
const oauth = new OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  "1.0A",
  CALLBACK_URL,
  "HMAC-SHA1",
)

export async function GET(request: NextRequest) {
  try {
    // Generate request token
    const requestTokenPromise = () => {
      return new Promise<{ oauthToken: string; oauthTokenSecret: string }>((resolve, reject) => {
        oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
          if (error) {
            return reject(error)
          }
          resolve({ oauthToken, oauthTokenSecret })
        })
      })
    }

    const { oauthToken, oauthTokenSecret } = await requestTokenPromise()

    // Store the token secret in a cookie for later use
    const response = NextResponse.redirect(`https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`)

    // Set a secure, httpOnly cookie with the token secret
    response.cookies.set({
      name: "twitter_oauth_token_secret",
      value: oauthTokenSecret,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 5, // 5 minutes
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Twitter OAuth Error:", error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/settings/accounts?error=oauth_failed`,
    )
  }
}
