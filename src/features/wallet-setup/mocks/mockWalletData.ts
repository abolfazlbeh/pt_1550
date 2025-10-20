/**
 * Mock wallet data for UI prototype
 */

export interface MockWallet {
  id: string;
  name: string;
  address: string;
  balance: string;
  createdAt: Date;
  isBackedUp: boolean;
}

export const MOCK_WALLET: MockWallet = {
  id: "wallet_mock_001",
  name: "My Wallet",
  address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  balance: "0.00",
  createdAt: new Date(),
  isBackedUp: false,
};

/**
 * Demo PIN for testing
 */
export const DEMO_PIN = "123456";

/**
 * Simulate async wallet creation
 */
export const simulateWalletCreation = async (_seedPhrase: string[]): Promise<MockWallet> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    ...MOCK_WALLET,
    createdAt: new Date(),
  };
};

/**
 * Simulate async wallet restoration
 */
export const simulateWalletRestoration = async (_seedPhrase: string[]): Promise<MockWallet> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    ...MOCK_WALLET,
    createdAt: new Date(),
    isBackedUp: true,
  };
};
