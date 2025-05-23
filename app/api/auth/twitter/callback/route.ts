import { type NextRequest, NextResponse } from "next/server"
import { OAuth } from "oauth"
import { cookies } from "next/headers"

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
    const searchParams = request.nextUrl.searchParams
    const oauthToken = searchParams.get("oauth_token")
    const oauthVerifier = searchParams.get("oauth_verifier")

    // Get the token secret from the cookie
    const cookieStore = cookies()
    const oauthTokenSecret = cookieStore.get("twitter_oauth_token_secret")?.value

    if (!oauthToken || !oauthVerifier || !oauthTokenSecret) {
      throw new Error("Missing OAuth parameters")
    }

    // Exchange request token for access token
    const accessTokenPromise = () => {
      return new Promise<{ accessToken: string; accessTokenSecret: string; results: any }>((resolve, reject) => {
        oauth.getOAuthAccessToken(
          oauthToken,
          oauthTokenSecret,
          oauthVerifier,
          (error, accessToken, accessTokenSecret, results) => {
            if (error) {
              return reject(error)
            }
            resolve({ accessToken, accessTokenSecret, results })
          },
        )
      })
    }

    const { accessToken, accessTokenSecret, results } = await accessTokenPromise()

    // Get user details
    const userDetailsPromise = () => {
      return new Promise<any>((resolve, reject) => {
        oauth.get(
          "https://api.twitter.com/1.1/users/show.json?user_id=" + results.user_id,
          accessToken,
          accessTokenSecret,
          (error, data) => {
            if (error) {
              return reject(error)
            }
            resolve(JSON.parse(data as string))
          },
        )
      })
    }

    const userDetails = await userDetailsPromise()

    // Store the tokens and user info in a secure cookie or database
    // For this example, we'll use cookies, but in production, you should use a database
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/settings/accounts?success=true`,
    )

    // Clear the temporary token secret cookie
    response.cookies.delete("twitter_oauth_token_secret")

    // Set a secure cookie with the account info (encrypted in production)
    const accountInfo = {
      id: results.user_id,
      username: userDetails.screen_name,
      name: userDetails.name,
      profileImage: userDetails.profile_image_url_https,
      accessToken,
      accessTokenSecret,
    }

    // In a real app, you would store this in a database associated with the user
    // For demo purposes, we'll store it in a cookie
    response.cookies.set({
      name: "twitter_account_info",
      value: JSON.stringify(accountInfo),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Twitter OAuth Callback Error:", error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/settings/accounts?error=oauth_callback_failed`,
    )
  }
}
