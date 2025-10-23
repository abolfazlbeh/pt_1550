# Wallet Setup Navigation Flow

**Project**: Wallet Setup UI Prototype  
**Last Updated**: October 2025

This document describes the complete navigation flow for the wallet setup process.

---

## Flow Paths

### Create New Wallet Flow

```
1. Home (/)
   ↓
2. Welcome (/welcome)
   ↓ [Create New Wallet]
3. Explainer (/wallet-setup/explainer?mode=create) - Step 1 of 8
   ↓
4. Pre-Reveal Tips (/wallet-setup/pre-reveal-tips?mode=create) - Step 2 of 8
   ↓
5. Reveal Seed (/wallet-setup/reveal-seed?mode=create) - Step 3 of 8
   ↓
6. Post-Reveal Checklist (/wallet-setup/post-reveal-checklist?mode=create) - Step 4 of 8
   ↓
7. Seed Confirmation (/wallet-setup/confirmation?mode=create) - Step 5 of 8
   ↓
8. App Lock (/wallet-setup/app-lock?mode=create) - Step 6 of 8
   ↓
9. Success (/wallet-setup/success?mode=create)
   ↓
10. Home (/)
```

### Restore Existing Wallet Flow

```
1. Home (/)
   ↓
2. Welcome (/welcome)
   ↓ [Restore Existing Wallet]
3. Restore Wallet (/wallet-setup/restore?mode=restore)
   ↓
4. App Lock (/wallet-setup/app-lock?mode=restore) - Step 6 of 8
   ↓
5. Success (/wallet-setup/success?mode=restore)
   ↓
6. Home (/)
```

---

## Screen Details

### 1. Home (/)
- **Purpose**: App landing page
- **Routes to**: Welcome
- **Back navigation**: N/A

### 2. Welcome (/welcome)
- **Purpose**: Entry point for wallet setup
- **Routes to**: 
  - Explainer (mode=create)
  - RestoreWallet (mode=restore)
  - Home (back button)
- **Progress**: Entry point (no step indicator)

### 3. Explainer (/wallet-setup/explainer)
- **Purpose**: Educate users about wallet security
- **Routes to**: PreRevealTips
- **Back navigation**: Welcome
- **Progress**: Step 1 of 8 • Wallet Creation

### 4. Pre-Reveal Tips (/wallet-setup/pre-reveal-tips)
- **Purpose**: Prepare users before revealing seed phrase
- **Routes to**: RevealSeed
- **Back navigation**: Explainer
- **Progress**: Step 2 of 8 • Wallet Creation

### 5. Reveal Seed (/wallet-setup/reveal-seed)
- **Purpose**: Display 12-word recovery phrase with hold-to-reveal
- **Routes to**: PostRevealChecklist
- **Back navigation**: Explainer
- **Progress**: Step 3 of 8 • Wallet Creation

### 6. Post-Reveal Checklist (/wallet-setup/post-reveal-checklist)
- **Purpose**: Verify backup best practices
- **Routes to**: SeedConfirmation
- **Back navigation**: RevealSeed
- **Progress**: Step 4 of 8 • Wallet Creation

### 7. Seed Confirmation (/wallet-setup/confirmation)
- **Purpose**: Verify 3 random words from recovery phrase
- **Routes to**: AppLock
- **Back navigation**: PostRevealChecklist
- **Progress**: Step 5 of 8 • Wallet Creation

### 8. Restore Wallet (/wallet-setup/restore)
- **Purpose**: Enter existing recovery phrase to restore wallet
- **Routes to**: AppLock
- **Back navigation**: Welcome
- **Progress**: Wallet Restoration

### 9. App Lock (/wallet-setup/app-lock)
- **Purpose**: Set 6-digit PIN for app security
- **Routes to**: Success
- **Back navigation**: 
  - SeedConfirmation (create mode)
  - RestoreWallet (restore mode)
- **Progress**: Step 6 of 8 • Wallet Creation

### 10. Success (/wallet-setup/success)
- **Purpose**: Celebrate completion and show setup summary
- **Routes to**: Home
- **Back navigation**: None
- **Progress**: Completion (no step indicator)

---

## Mode Parameter

All screens use a `mode` query parameter to track the user's flow:
- `mode=create` - User is creating a new wallet
- `mode=restore` - User is restoring an existing wallet

This parameter is passed through the entire flow to maintain context.

---

## Progress Indicators

Progress indicators appear at the bottom of each screen to show users where they are in the process:

- **Format**: "Step X of 8 • Wallet Creation"
- **Screens with indicators**: Explainer, PreRevealTips, RevealSeed, PostRevealChecklist, SeedConfirmation, AppLock
- **Screens without indicators**: Home, Welcome (entry points), Success (completion), RestoreWallet (alternate flow)

---

## Back Navigation

Each screen implements back button navigation:
- Returns to the previous screen in the flow
- Preserves the `mode` parameter
- Welcome screen returns to Home
- Success screen has no back button (one-way completion)

---

## Route Configuration

All routes are defined in `/src/App.tsx` using React Router:

```typescript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/welcome" element={<Welcome />} />
  <Route path="/wallet-setup/explainer" element={<Explainer />} />
  <Route path="/wallet-setup/pre-reveal-tips" element={<PreRevealTips />} />
  <Route path="/wallet-setup/reveal-seed" element={<RevealSeed />} />
  <Route path="/wallet-setup/post-reveal-checklist" element={<PostRevealChecklist />} />
  <Route path="/wallet-setup/confirmation" element={<SeedConfirmation />} />
  <Route path="/wallet-setup/app-lock" element={<AppLock />} />
  <Route path="/wallet-setup/success" element={<Success />} />
  <Route path="/wallet-setup/restore" element={<RestoreWallet />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

All undefined routes redirect to Home.

---

## State Management

Currently, the app uses:
- **URL parameters** for mode tracking (`mode=create` or `mode=restore`)
- **Local component state** for screen-specific data
- **No global state management** - each screen is independent

Future considerations:
- Context API for wallet setup state
- Persist progress in case of page refresh
- Validation state across screens
