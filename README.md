# CLAI - AI-Powered X Management Platform

A comprehensive X (Twitter) management platform that leverages AI for content creation, editing, and engagement while maintaining enterprise-grade reliability, user control, and transparency.

## Features

- 🤖 AI-Powered Content Creation
- 📊 Advanced Analytics
- ⏰ Smart Scheduling
- 🔒 Secure Authentication
- 🎯 Multi-Account Management
- 📱 Responsive Design

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Twitter Developer Account
- Google AI API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/clai.git
cd clai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
# Twitter API Credentials
TWITTER_CLIENT_ID=your_client_id_here
TWITTER_CLIENT_SECRET=your_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google AI Configuration
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── content/          # Content management
│   ├── analytics/        # Analytics pages
│   └── settings/         # Settings pages
├── components/            # Reusable components
├── lib/                  # Utility functions
└── types/                # TypeScript types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js
- Tailwind CSS
- NextAuth.js
- Google AI
- Twitter API
