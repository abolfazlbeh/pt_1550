/**
 * Utility functions for wallet setup
 */

/**
 * Simulate async delay for loading states
 */
export const simulateDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Format PIN for display (show dots)
 */
export const formatPinDisplay = (pin: string): string => {
  return "•".repeat(pin.length);
};

/**
 * Validate PIN format (6 digits)
 */
export const isValidPin = (pin: string): boolean => {
  return /^\d{6}$/.test(pin);
};

/**
 * Check if two PINs match
 */
export const pinsMatch = (pin1: string, pin2: string): boolean => {
  return pin1 === pin2 && isValidPin(pin1);
};

/**
 * Format seed word with position number
 */
export const formatSeedWord = (word: string, position: number): string => {
  return `${position}. ${word}`;
};

/**
 * Calculate setup progress percentage
 */
export const calculateProgress = (currentStep: string, totalSteps: number): number => {
  const steps = [
    "welcome",
    "explainer", 
    "reveal-seed",
    "write-tips",
    "confirmation",
    "app-lock",
    "success"
  ];
  
  const currentIndex = steps.indexOf(currentStep);
  return Math.round(((currentIndex + 1) / totalSteps) * 100);
};
