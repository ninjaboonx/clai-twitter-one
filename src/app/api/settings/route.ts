import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/db'

const settingsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  timezone: z.string(),
  notifications: z.object({
    email: z.boolean(),
    contentAlerts: z.boolean(),
  }),
})

export async function GET() {
  const session = await getServerSession()

  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { settings: true },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      timezone: user.timezone,
      notifications: {
        email: user.settings?.emailNotifications ?? true,
        contentAlerts: user.settings?.contentAlerts ?? true,
      },
    })
  } catch (error) {
    console.error('Error fetching user settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession()

  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = settingsSchema.parse(body)

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        timezone: validatedData.timezone,
        settings: {
          upsert: {
            create: {
              emailNotifications: validatedData.notifications.email,
              contentAlerts: validatedData.notifications.contentAlerts,
            },
            update: {
              emailNotifications: validatedData.notifications.email,
              contentAlerts: validatedData.notifications.contentAlerts,
            },
          },
        },
      },
    })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating user settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 