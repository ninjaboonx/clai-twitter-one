import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const accounts = await db.twitterAccount.findMany({
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    })
    
    return NextResponse.json(accounts)
  } catch (error) {
    console.error('Error fetching Twitter accounts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Twitter accounts' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      )
    }

    const updatedAccount = await db.twitterAccount.update({
      where: { id },
      data,
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    })

    return NextResponse.json(updatedAccount)
  } catch (error) {
    console.error('Error updating Twitter account:', error)
    return NextResponse.json(
      { error: 'Failed to update Twitter account' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const account = await db.twitterAccount.create({
      data: body,
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    })
    return NextResponse.json(account)
  } catch (error) {
    console.error('Error creating Twitter account:', error)
    return NextResponse.json(
      { error: 'Failed to create Twitter account' },
      { status: 500 }
    )
  }
}