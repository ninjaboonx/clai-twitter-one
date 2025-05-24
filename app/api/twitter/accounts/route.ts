import { NextResponse } from 'next/server'

const mockAccounts = [
  {
    id: '1',
    username: 'demo_account1',
    name: 'Demo Account 1',
    profileImage: 'https://api.dicebear.com/7.x/avatars/svg?seed=1',
    isActive: true,
  },
  {
    id: '2',
    username: 'demo_account2',
    name: 'Demo Account 2',
    profileImage: 'https://api.dicebear.com/7.x/avatars/svg?seed=2',
    isActive: false,
  },
]

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return NextResponse.json(mockAccounts)
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
    console.log('Updating account:', body)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating Twitter account:', error)
    return NextResponse.json(
      { error: 'Failed to update Twitter account' },
      { status: 500 }
    )
  }
}