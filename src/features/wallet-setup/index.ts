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

// Screens
export { default as WelcomeScreen } from "./screens/Welcome";
export { default as ExplainerScreen } from "./screens/Explainer";
export { default as PreRevealTipsScreen } from "./screens/PreRevealTips";
export { default as RevealSeedScreen } from "./screens/RevealSeed";
export { default as PostRevealChecklistScreen } from "./screens/PostRevealChecklist";
export { default as SeedConfirmationScreen } from "./screens/SeedConfirmation";
