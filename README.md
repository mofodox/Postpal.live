# Postpal.live

Postpal.live is a social media content generator tool for non-marketers who need help creating engaging social media content. Using AI, it suggests content ideas for TikTok, Instagram, or Reels based on your product and target audience.

## Features

- Simple form to collect product and audience information
- AI-powered content idea generation
- Platform-specific content suggestions 
- Copy options for script, caption, or entire content idea
- Multiple AI model options from different providers

## Tech Stack

- Next.js 15.3
- TypeScript
- TailwindCSS
- Multiple AI providers:
  - Anthropic Claude API
  - OpenAI GPT API
- Vercel Edge Runtime

## Getting Started

### Prerequisites

- Node.js 18+ 
- API keys for:
  - Anthropic Claude
  - OpenAI (optional, but recommended for model variety)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/postpal.git
   cd postpal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your API keys:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The easiest way to deploy the app is with [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Add your environment variables
4. Deploy!

## License

This project is licensed under the MIT License.