import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import FilterPage from './pages/FilterPage'
import DetailPage from './pages/DetailPage'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <div className="container">
          <small>© 2026 CatFacts App — Mhd Dimas Naufal</small>
        </div>
      </footer>
    </>
  )
}