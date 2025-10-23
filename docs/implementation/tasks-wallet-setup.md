# Wallet First-Run Setup - Task List

**Project**: Wallet Setup UI Prototype  
**Focus**: Design & Interactions with Mock Data  
**Last Updated**: October 2025

---

## Task List

- [x] **Task 1: Setup Project & Mock Data** ✅  
  Install dependencies (framer-motion, lucide-react), create folder structure (`/src/features/wallet-setup/screens`, `/components`, `/mocks`), and create mock seed phrases & wallet data files.

- [x] **Task 2: Build Welcome & Explainer Screens** ✅  
  Create Welcome screen with "Create Wallet" and "Restore Wallet" buttons, then build Explainer screen with a 3-card carousel explaining wallet security basics.

- [x] **Task 3: Build Pre-Reveal Security Tips Screen** ✅  
  Create screen before seed reveal with preparation tips: "Get pen and paper ready", "No screenshots allowed", "Keep this private", with icons and a "I'm Ready" continue button.

- [x] **Task 4: Build Reveal Seed Screen** ✅  
  Create screen with "hold-to-reveal" button (3-second press), display 12 mock seed words in a numbered grid, add warning message, and "I've written it down" checkbox.

- [x] **Task 5: Build Post-Reveal Checklist Screen** ✅  
  Create screen reinforcing security best practices after reveal: backup verification checklist (written on paper, stored safely, no digital copies), with continue button.

- [x] **Task 6: Build Seed Confirmation Screen** ✅  
  Create screen that randomly asks user to confirm 3 words from their seed phrase (e.g., "What is word #3, #7, #11?") with input fields and validation feedback.

- [x] **Task 7: Build App Lock Screen** ✅  
  Create screen for PIN setup with two 6-digit input fields (create + confirm PIN), add visual biometric toggle option, and validation for PIN match.

- [x] **Task 8: Build Success Screen** ✅  
  Create success screen with checkmark animation, "Wallet Ready!" message, security setup summary, and "Go to Wallet" button.

- [x] **Task 9: Build Restore Wallet Screen** ✅  
  Create screen with 12/24 word toggle, grid of input fields with BIP-39 word autocomplete, paste button, and visual validation feedback.

- [ ] **Task 10: Implement Navigation Flow & Routing**  
  Setup React Router for all screens, implement flow state management, add progress indicator, and connect all screens: Welcome → Explainer → Pre-Reveal Tips → Reveal → Post-Reveal Checklist → Confirmation → Lock → Success → Home.

- [ ] **Task 11: Add Animations & Polish**  
  Add hold-to-reveal animation, seed word reveal effect (blur to clear), confirmation validation animations (checkmark/shake), page transitions, and responsive design for mobile/tablet/desktop.

---

## Flow Reference

Based on the provided flow diagram:

```
Welcome (entry point)
  ├─→ Create New Wallet
  │    └─→ Explainer → Pre-Reveal Tips → Reveal Seed → Post-Reveal Checklist → Confirmation → Set App Lock → Success → Home
  │
  └─→ Restore Wallet
       └─→ Restore Screen → Set App Lock → Success → Home
```

---

## Quick Notes

### Mock Data to Include
- Sample seed phrase: `["abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse", "access", "accident"]`
- Sample validation: Ask for words #3, #7, #11
- Demo PIN: `123456`

### Key Interactions
- **Hold to reveal**: 3-second press with circular progress
- **Carousel**: Swipe through 3 explainer cards
- **Autocomplete**: BIP-39 word suggestions on restore screen
- **Validation**: Visual feedback (green checkmark / red shake)

### Design Notes
- Use TailwindCSS for styling
- Mobile-first approach
- Monospace font for seed words
- High contrast warnings (red/yellow)

---

**Start with Task 1 and work sequentially through Task 10.**
