/**
 * Mock seed phrases for UI prototype
 * These are sample BIP-39 mnemonic phrases for demonstration only
 */

export const MOCK_SEED_PHRASES = [
  [
    "abandon", "ability", "able", "about",
    "above", "absent", "absorb", "abstract",
    "absurd", "abuse", "access", "accident"
  ],
  [
    "acquire", "across", "action", "actor",
    "actual", "adapt", "add", "address",
    "adjust", "admit", "adult", "advance"
  ],
  [
    "advice", "aerobic", "affair", "afford",
    "afraid", "again", "age", "agent",
    "agree", "ahead", "aim", "air"
  ],
];

/**
 * Get a random seed phrase for demo
 */
export const getRandomSeedPhrase = (): string[] => {
  const randomIndex = Math.floor(Math.random() * MOCK_SEED_PHRASES.length);
  return MOCK_SEED_PHRASES[randomIndex];
};

/**
 * Generate random word positions for confirmation (e.g., 3, 7, 11)
 */
export const getRandomWordPositions = (count: number = 3): number[] => {
  const positions: number[] = [];
  while (positions.length < count) {
    const pos = Math.floor(Math.random() * 12) + 1; // 1-12
    if (!positions.includes(pos)) {
      positions.push(pos);
    }
  }
  return positions.sort((a, b) => a - b);
};
