import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './screens/Home.tsx'
import Welcome from './screens/Welcome.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
