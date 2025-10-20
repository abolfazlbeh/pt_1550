import { useState } from "react";
import type { WalletSetupStep, SetupMode, WalletSetupState } from "../types";

// Define flow sequences outside component for performance
const CREATE_FLOW: WalletSetupStep[] = [
  "welcome",
  "explainer",
  "reveal-seed",
  "write-tips",
  "confirmation",
  "app-lock",
  "success",
];

const RESTORE_FLOW: WalletSetupStep[] = [
  "welcome",
  "restore",
  "app-lock",
  "success",
];

/**
 * Hook to manage wallet setup flow state
 */
export const useWalletSetupState = () => {
  const [state, setState] = useState<WalletSetupState>({
    mode: null,
    currentStep: "welcome",
    seedPhrase: [],
    confirmationWords: [],
    pin: "",
    isBackedUp: false,
    isCompleted: false,
  });

  const setMode = (mode: SetupMode) => {
    setState(prev => ({ ...prev, mode }));
  };

  const getFlow = (): WalletSetupStep[] => {
    return state.mode === "create" ? CREATE_FLOW : RESTORE_FLOW;
  };

  const nextStep = () => {
    const flow = getFlow();
    const currentIndex = flow.indexOf(state.currentStep);
    
    if (currentIndex !== -1 && currentIndex < flow.length - 1) {
      const nextStep = flow[currentIndex + 1];
      if (nextStep) {
        setState(prev => ({ ...prev, currentStep: nextStep }));
      }
    }
  };

  const previousStep = () => {
    const flow = getFlow();
    const currentIndex = flow.indexOf(state.currentStep);
    
    if (currentIndex > 0) {
      const prevStep = flow[currentIndex - 1];
      if (prevStep) {
        setState(prev => ({ ...prev, currentStep: prevStep }));
      }
    }
  };

  const setSeedPhrase = (phrase: string[]) => {
    setState(prev => ({ ...prev, seedPhrase: phrase }));
  };

  const setConfirmationWords = (words: { position: number; word: string }[]) => {
    setState(prev => ({ ...prev, confirmationWords: words }));
  };

  const setPin = (pin: string) => {
    setState(prev => ({ ...prev, pin }));
  };

  const markBackupComplete = () => {
    setState(prev => ({ ...prev, isBackedUp: true }));
  };

  const completeSetup = () => {
    setState(prev => ({ ...prev, isCompleted: true }));
  };

  const reset = () => {
    setState({
      mode: null,
      currentStep: "welcome",
      seedPhrase: [],
      confirmationWords: [],
      pin: "",
      isBackedUp: false,
      isCompleted: false,
    });
  };

  return {
    state,
    setMode,
    nextStep,
    previousStep,
    setSeedPhrase,
    setConfirmationWords,
    setPin,
    markBackupComplete,
    completeSetup,
    reset,
  };
};
