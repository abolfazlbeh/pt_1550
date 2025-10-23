import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './screens/Home.tsx'
import Welcome from './features/wallet-setup/screens/Welcome.tsx'
import Explainer from './features/wallet-setup/screens/Explainer.tsx'
import PreRevealTips from './features/wallet-setup/screens/PreRevealTips.tsx'
import RevealSeed from './features/wallet-setup/screens/RevealSeed.tsx'
import PostRevealChecklist from './features/wallet-setup/screens/PostRevealChecklist.tsx'
import SeedConfirmation from './features/wallet-setup/screens/SeedConfirmation.tsx'
import AppLock from './features/wallet-setup/screens/AppLock.tsx'
import Success from './features/wallet-setup/screens/Success.tsx'
import RestoreWallet from './features/wallet-setup/screens/RestoreWallet.tsx'

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
