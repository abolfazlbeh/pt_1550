/**
 * Wallet Setup Feature - Main Export
 */

// Types
export * from "./types";

// Hooks
export { useWalletSetupState } from "./hooks/useWalletSetupState";

// Mock Data
export {
  MOCK_SEED_PHRASES,
  getRandomSeedPhrase,
  getRandomWordPositions,
} from "./mocks/mockSeedPhrases";

export {
  MOCK_WALLET,
  DEMO_PIN,
  simulateWalletCreation,
  simulateWalletRestoration,
} from "./mocks/mockWalletData";

export {
  BIP39_WORDS,
  filterBIP39Words,
  isValidBIP39Word,
} from "./mocks/bip39Words";

// Utils
export * from "./utils";
