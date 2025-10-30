# StreamerTipKit

Empowering streamers with onchain tips and Farcaster engagement.

## Features

- 🎯 **Onchain Tip Jar**: Direct, low-fee micro-donations on Base
- 🎨 **Farcaster Integration**: Interactive gifting with social proof
- 🏆 **Loyalty System**: Onchain badges and reputation
- 📱 **Mobile-First**: Optimized for Base App experience

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` from `.env.local.example` and add your OnchainKit API key:
```bash
cp .env.local.example .env.local
# Edit .env.local and add your NEXT_PUBLIC_ONCHAINKIT_API_KEY
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## X402 Payment Integration

StreamerTipKit now includes full x402 payment protocol integration for USDC tips on Base. Features include:

- **Wagmi Integration**: Uses `useWalletClient` for wallet connection and signing
- **x402-axios**: Handles payment processing with proper authentication headers
- **USDC on Base**: Native support for USDC payments on Base network
- **Transaction Confirmation**: Real-time status updates and Basescan links
- **Error Handling**: Comprehensive error handling with user-friendly messages

For detailed implementation information, see [X402_IMPLEMENTATION.md](./X402_IMPLEMENTATION.md).

For testing instructions, see [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md).

## Tech Stack

- **Next.js 15** with App Router
- **React 19** for modern UI patterns
- **OnchainKit** for Base integration
- **MiniKit** for Farcaster features
- **Tailwind CSS** for styling
- **TypeScript** for type safety

## Base Mini App Integration

This app is built as a Farcaster Mini App with:
- Wallet connection via OnchainKit
- Gasless transactions with Paymaster
- Farcaster identity and notifications
- Frame generation for social sharing

## Architecture

```
app/
├── components/          # React components
│   ├── TipJarScreen.tsx    # Main tipping interface
│   ├── TipsScreen.tsx      # Tip history and stats
│   ├── ProfileScreen.tsx   # User profile and settings
│   └── WalletConnect.tsx   # Wallet connection
├── layout.tsx          # Root layout with providers
├── page.tsx            # Main app entry point
├── providers.tsx       # OnchainKit and React Query setup
└── globals.css         # Global styles with BASE theme

public/
└── .well-known/
    └── farcaster.json  # Mini App manifest
```

## Development

- Uses BASE theme with dark blue background (#0a1929)
- Base blue accents (#0052ff)
- Mobile-first responsive design
- Production-ready TypeScript patterns

## License

MIT
