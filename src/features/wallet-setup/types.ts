/**
 * TypeScript types for wallet setup flow
 */

export type WalletSetupStep =
  | "welcome"
  | "explainer"
  | "reveal-seed"
  | "write-tips"
  | "confirmation"
  | "app-lock"
  | "success"
  | "restore";

export type SetupMode = "create" | "restore";

export interface WalletSetupState {
  mode: SetupMode | null;
  currentStep: WalletSetupStep;
  seedPhrase: string[];
  confirmationWords: { position: number; word: string }[];
  pin: string;
  isBackedUp: boolean;
  isCompleted: boolean;
}

export interface WalletSetupActions {
  setMode: (mode: SetupMode) => void;
  nextStep: () => void;
  previousStep: () => void;
  setSeedPhrase: (phrase: string[]) => void;
  setConfirmationWords: (words: { position: number; word: string }[]) => void;
  setPin: (pin: string) => void;
  markBackupComplete: () => void;
  completeSetup: () => void;
  reset: () => void;
}

export type WalletSetupContext = WalletSetupState & WalletSetupActions;
