import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import FactCard from '../components/FactCard'

const BASE_URL = 'https://catfact.ninja'

export default function FilterPage() {
  const [allFacts, setAllFacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchManyFacts = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(`${BASE_URL}/facts?limit=30`)
        const factsWithId = response.data.data.map((fact, index) => ({
          ...fact,
          id: `filter-api-${index}`,
          isLocal: false,
        }))
        setAllFacts(factsWithId)
      } catch (err) {
        setError('Gagal memuat data untuk filter. Silakan coba lagi.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchManyFacts()
  }, [])

  const filteredFacts = useMemo(() => {
    let result = [...allFacts]

    if (filterType === 'short') {
      result = result.filter(f => f.length < 30)
    } else if (filterType === 'medium') {
      result = result.filter(f => f.length >= 30 && f.length <= 60)
    } else if (filterType === 'long') {
      result = result.filter(f => f.length > 60)
    }

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase()
      result = result.filter(f => f.fact.toLowerCase().includes(keyword))
    }

    return result
  }, [allFacts, filterType, searchTerm])

  const filterButtons = [
    { value: 'all', label: '📋 Semua', variant: 'btn-dark' },
    { value: 'short', label: '🐣 Pendek (<30)', variant: 'btn-success' },
    { value: 'medium', label: '🐱 Sedang (30-60)', variant: 'btn-warning' },
    { value: 'long', label: '🦁 Panjang (>60)', variant: 'btn-danger' },
  ]

  const stats = {
    all: allFacts.length,
    short: allFacts.filter(f => f.length < 30).length,
    medium: allFacts.filter(f => f.length >= 30 && f.length <= 60).length,
    long: allFacts.filter(f => f.length > 60).length,
  }

  const currentCount = stats[filterType] || stats.all

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">🔍 Filter & Pencarian</h1>
        <p className="lead text-muted">Temukan fakta kucing berdasarkan panjang karakter atau kata kunci</p>
      </div>

      {/* Search Bar */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-lg-8">
          <div className="input-group input-group-lg shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Cari kata kunci fakta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
        {filterButtons.map(btn => (
          <button
            key={btn.value}
            className={`btn ${filterType === btn.value ? btn.variant : 'btn-outline-secondary'} rounded-pill fw-semibold`}
            onClick={() => setFilterType(btn.value)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="text-center mb-4">
        <span className="badge bg-secondary fs-6 rounded-pill px-4 py-2">
          Menampilkan {filteredFacts.length} dari {currentCount} fakta
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Empty Result */}
      {!loading && !error && filteredFacts.length === 0 && (
        <div className="text-center py-5">
          <h2 className="text-muted">🔎</h2>
          <p className="text-muted fs-5">Tidak ada fakta yang sesuai dengan filter.</p>
          <button
            className="btn btn-outline-secondary rounded-pill"
            onClick={() => { setFilterType('all'); setSearchTerm(''); }}
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Results Grid */}
      {!loading && filteredFacts.length > 0 && (
        <div className="row g-4">
          {filteredFacts.map((fact) => (
            <FactCard key={fact.id} fact={fact} onEdit={() => {}} onDelete={() => {}} />
          ))}
        </div>
      )}
    </div>
  )
}