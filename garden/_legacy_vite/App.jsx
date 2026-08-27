import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { TransitionProvider } from './components/PageTransition'
import Layout from './components/Layout'
import Home from './pages/Home'
import Banda from './pages/Banda'
import AoVivo from './pages/AoVivo'
import Sons from './pages/Sons'
import Contato from './pages/Contato'

export default function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/banda" element={<Banda />} />
            <Route path="/ao-vivo" element={<AoVivo />} />
            <Route path="/sons" element={<Sons />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </TransitionProvider>
    </BrowserRouter>
  )
}
