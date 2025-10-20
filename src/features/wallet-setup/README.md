# Wallet Setup Feature

This folder contains all the UI components, screens, and logic for the wallet first-run setup flow.

## Structure

```
wallet-setup/
├── screens/          # Screen components (Welcome, Explainer, etc.)
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── mocks/           # Mock data for prototype
├── types.ts         # TypeScript type definitions
├── utils.ts         # Utility functions
├── index.ts         # Main export file
└── README.md        # This file
```

## Mock Data

### Seed Phrases (`mocks/mockSeedPhrases.ts`)
- 3 sample 12-word seed phrases
- `getRandomSeedPhrase()` - Get a random phrase
- `getRandomWordPositions()` - Generate positions for confirmation

### Wallet Data (`mocks/mockWalletData.ts`)
- Mock wallet object with id, address, balance
- `simulateWalletCreation()` - Simulate 2s delay
- `simulateWalletRestoration()` - Simulate 2s delay
- Demo PIN: `123456`

### BIP-39 Words (`mocks/bip39Words.ts`)
- Subset of BIP-39 wordlist for autocomplete
- `filterBIP39Words()` - Filter by query
- `isValidBIP39Word()` - Validate word

## State Management

### `useWalletSetupState` Hook
Manages the entire setup flow state:
- Current step tracking
- Mode selection (create/restore)
- Seed phrase storage
- PIN management
- Navigation helpers

## Utilities

- `simulateDelay()` - Async delay for loading states
- `isValidPin()` - Validate 6-digit PIN
- `pinsMatch()` - Compare two PINs
- `formatSeedWord()` - Format with position number
- `calculateProgress()` - Progress percentage

## Usage

```typescript
import {
  useWalletSetupState,
  getRandomSeedPhrase,
  DEMO_PIN,
  simulateWalletCreation
} from "@/features/wallet-setup";

// In your component
const { state, nextStep, setSeedPhrase } = useWalletSetupState();
const seedPhrase = getRandomSeedPhrase();
```

## Next Steps

1. Build screen components in `screens/`
2. Build reusable components in `components/`
3. Setup routing with React Router
4. Add animations with Framer Motion
5. Style with TailwindCSS

## Flow

```
Welcome
  ├─ Create Wallet
  │   └─ Explainer → Reveal Seed → Tips → Confirmation → Lock → Success
  └─ Restore Wallet
      └─ Restore Screen → Lock → Success
```
