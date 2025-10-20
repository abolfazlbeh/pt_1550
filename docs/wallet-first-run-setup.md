# Product Design Report — First-Run Wallet Setup & Seed Storage (Single Account)

## 1) Problem, Goals, Non-Goals

### Problem
New users need to create or restore a non-custodial wallet safely. Most drop-offs happen at seed-backup steps or from confusing jargon.

### Goals
- Quick setup
- Full encryption
- Secure PIN/biometric authentication
- Recoverability
- Excellent UX

### Non-Goals
- Multi-account support
- MPC (Multi-Party Computation)
- Hardware wallet integration

---

## 2) User & Context

### Persona
Self-custody-curious user, mobile-first, privacy-focused but not tech-savvy.

### Anxieties
- Losing funds
- Taking screenshots (security risk)
- Device loss

### Context
First run, low patience, likely mobile device.

---

## 3) Competitive Snapshot

### MetaMask
Emphasizes password + backup SRP (Secret Recovery Phrase).

### Trust Wallet
Enforces backup before send, offline copy recommendation.

### Others
- Coinomi
- Coinbase Wallet
- Rainbow Wallet

### Best Practices
- Progressive disclosure
- Offline backup
- Minimal friction
- Screenshot blocking

---

## 4) Experience Principles

1. **Use plain, friendly language** - Avoid jargon
2. **Reveal advanced options only if asked** - Progressive disclosure
3. **Default 12-word seed, 24 in advanced** - Balance security and UX
4. **Backup before send** - Enforce security before transactions
5. **Block screenshots and obscure sensitive views** - Prevent accidental exposure

---

## 5) Flow Overview

### Creation Flow
1. **Welcome** → 2. **Create/Restore** → 3. **Explainer** → 4. **Reveal Seed** → 5. **Write Down Tips** → 6. **Confirmation** → 7. **App Lock** → 8. **Success** → 9. **Home**

### Restore Flow
**Enter Seed** → **Validate** → **Lock** → **Success**

---

## 6) Screen Details

### A) Welcome
**Message**: "Your keys. Your crypto."  
**Actions**: Create or Restore

### B) Explainer
Carousel of 3 security cards explaining wallet fundamentals.

### C) Reveal Seed
- Hold-to-reveal or biometric authentication
- FLAG_SECURE enabled (prevents screenshots)

### D) Write-down Tips
**Guidance**: "No screenshots, make 2 paper copies."

### E) Confirmation
Random 3-word verification to ensure user wrote down seed phrase.

### F) App Lock
Set PIN + biometrics for app security.

### G) Success
**Message**: "Wallet ready. Backup complete."

### H) Restore
- Enter mnemonic phrase
- Validate BIP-39 compliance

### I) Home
- Backup badge/banner for awareness
- Entry point to wallet functionality

---

## 7) Security & Privacy

### Cryptographic Standards
- **BIP-39** seed generation with PBKDF2-HMAC-SHA512
- **BIP-32/44** HD (Hierarchical Deterministic) derivation
- **AES-256** encryption of seed at rest

### Platform Security
- **Keystore** (Android) / **Secure Enclave** (iOS)
- FLAG_SECURE implementation
- Screenshot detection and blocking

### Access Control
- PIN/biometric unlock required
- No seed leaves device (local-only storage)

---

## 8) Copy & Tone

### Terminology
- Prefer **"Recovery phrase"** over "seed phrase" or "mnemonic"
- Write at **6th-grade reading level**
- Explain risk in simple terms: *"Anyone with these words can take your funds."*

---

## 9) Validation Rules

### Technical Validation
- Validate against BIP-39 wordlist + checksum
- Warn on typos and invalid words
- Works offline (no network dependency)

### Security Measures
- Clipboard clear after 30 seconds
- Root/jailbreak detection warning
- Invalid phrase handling with helpful error messages

---

## 10) Information Architecture

### Setup Flow
Modal setup wizard (5–7 screens)

### Settings Access
**Settings** → **Security** → **Backup Phrase** (protected view requiring authentication)

---

## 11) Visual & Interaction

### Interactive Elements
- **Hold-to-reveal** animation for seed display
- Monospace, high-contrast typography for word list
- Tap-to-copy **disabled** for security
- 3-word confirmation check

### Accessibility
- Large text options
- Screen reader labels
- High contrast mode support

---

## 12) Content Blocks

### Seed Warning
> ⚠️ **Don't screenshot. Keep offline.**  
> Screenshots can be stolen from cloud backups. Write these words on paper.

### Passphrase Advanced Toggle
> 🔐 **Advanced: Optional Passphrase**  
> Adds extra security, but losing this means permanent loss.

---

## 13) Acceptance Criteria

✅ Create/Restore wallet functionality works end-to-end  
✅ Seed encrypted at rest with AES-256  
✅ Screenshot blocked/detected on sensitive screens  
✅ Backup confirmation completed before wallet access  
✅ App lock (PIN/biometric) enabled  
✅ BIP-39/32/44 compliant implementation  
✅ No network calls before reaching home screen  

---

## 14) Metrics

### Success Metrics
- **Setup completion rate**: Track drop-off points
- **Time-to-wallet-ready**: Target ≤90 seconds
- **Backup completion**: Target ≥85% of users
- **Screenshot warning rate**: Monitor security awareness

---

## 15) Implementation Notes

### Technology Stack
- **UI Framework**: Flutter/React Native (to be determined)
- **Crypto Engine**: Rust for cryptographic operations

### Rust Components
- BIP-39 implementation
- PBKDF2-HMAC-SHA512 seed derivation
- HD wallet key generation

### Flutter/React Native Components
- SecureStorage wrapper
- Keystore/Keychain integration
- Offline seed generation
- UI components and navigation

---

## 16) Localization

### Requirements
- Externalize all strings to resource files
- Avoid idioms and culturally-specific phrases
- Support RTL languages
- BIP-39 wordlists available in multiple languages

---

## 17) Threat Model

### Data Collection
- **No PII collected** during setup

### Risk Vectors
1. **Screenshots**: Mitigated with FLAG_SECURE
2. **Social engineering**: Mitigated with clear warnings
3. **Device compromise**: Mitigated with encryption + secure storage
4. **Shoulder surfing**: Mitigated with hold-to-reveal
5. **Clipboard sniffing**: Mitigated with auto-clear

---

## 18) Handoff for UI/UX

### Wireframes Required
1. Welcome screen
2. Explainer carousel
3. Reveal seed screen
4. Confirmation screen
5. App lock setup
6. Success screen
7. Restore flow
8. Home screen with backup banner

### Component Specifications
- **Numbered word list**: Grid layout, monospace font, copy-protection
- **Warning chip**: Red/yellow accent, icon + text
- **Biometric gate**: Native platform integration
- **Screenshot alert**: Modal with explanation

---

## 19) Roadmap

### Phase 2 Features
- [ ] Advanced passphrase UX
- [ ] SLIP-39 Shamir backup (multi-share recovery)
- [ ] Cloud encrypted backup option
- [ ] MPC / Account Abstraction research

### Future Considerations
- Multi-chain support
- Hardware wallet integration
- Social recovery mechanisms

---

## 20) Story Points & Definition of Done

### Story Points
**8 points** (medium-large feature)

### Definition of Done
- [ ] User can create a new wallet
- [ ] User can restore an existing wallet
- [ ] Seed is encrypted at rest using AES-256
- [ ] App lock (PIN/biometric) is mandatory
- [ ] Secure backup flow is completed
- [ ] BIP-39/32/44 compliance verified
- [ ] Screenshot protection implemented
- [ ] Unit tests for cryptographic functions
- [ ] Integration tests for full flow
- [ ] Security audit completed
- [ ] Documentation updated

---

## Appendix: Technical Specifications

### BIP Standards Implementation

#### BIP-39 (Mnemonic Code)
- **Entropy**: 128 bits (12 words) or 256 bits (24 words)
- **Wordlist**: English by default, support for other languages
- **Checksum**: Last word contains checksum bits
- **Derivation**: PBKDF2-HMAC-SHA512 with 2048 iterations

#### BIP-32 (HD Wallets)
- **Master seed**: Derived from BIP-39 seed
- **Derivation path**: Hierarchical key tree structure

#### BIP-44 (Multi-Account Hierarchy)
- **Path format**: `m / 44' / coin_type' / account' / change / address_index`
- **Coin types**: Bitcoin (0), Ethereum (60), etc.

### Storage Architecture

```
┌─────────────────────────────────────┐
│        User Interface Layer         │
│  (React/Flutter - PIN/Biometric UI) │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│       Secure Storage Layer          │
│  (Encrypted with platform Keystore) │
│    • Encrypted seed phrase          │
│    • User preferences               │
│    • App lock settings              │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│      Cryptographic Layer (Rust)     │
│    • BIP-39 seed generation         │
│    • BIP-32/44 derivation           │
│    • AES-256 encryption             │
└─────────────────────────────────────┘
```

---

## Notes for Development Team

1. **Security First**: Every decision should prioritize user security
2. **Offline First**: Wallet creation must work without internet
3. **Test Coverage**: Aim for >90% coverage on cryptographic functions
4. **Code Review**: All crypto code requires security-focused review
5. **Audit**: Plan for external security audit before production release

---

**Document Version**: 1.0  
**Last Updated**: October 2025  
**Status**: Ready for Design Phase  
**Next Steps**: UI/UX wireframes and technical architecture design
