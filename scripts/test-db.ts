import { db } from '../lib/db'

async function main() {
  try {
    // Test database connection
    console.log('Testing database connection...')
    
    // Create a test account
    const testAccount = await db.twitterAccount.create({
      data: {
        name: 'Test User',
        username: 'testuser',
        accessToken: 'test-token',
        profileImage: 'https://example.com/avatar.jpg'
      }
    })
    console.log('Created test account:', testAccount)

    // Read the account
    const accounts = await db.twitterAccount.findMany()
    console.log('All accounts:', accounts)

    // Clean up
    await db.twitterAccount.delete({
      where: { id: testAccount.id }
    })
    console.log('Test account deleted')

    console.log('Database test completed successfully!')
  } catch (error) {
    console.error('Database test failed:', error)
    process.exit(1)
  } finally {
    await db.$disconnect()
  }
}

main() 