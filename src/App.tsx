import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './screens/Home.tsx'
import Welcome from './features/wallet-setup/screens/Welcome.tsx'
import Explainer from './features/wallet-setup/screens/Explainer.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/wallet-setup/explainer" element={<Explainer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
