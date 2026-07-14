import { useState } from 'react'
import { useCatFacts } from '../hooks/useCatFacts'
import FactCard from '../components/FactCard'
import FactForm from '../components/FactForm'

export default function HomePage() {
  const { apiFacts, loading, error, refetch } = useCatFacts()
  const [localFacts, setLocalFacts] = useState([])
  const [editingFact, setEditingFact] = useState(null)

  const allFacts = [...localFacts, ...apiFacts]

  const handleAddFact = (factText) => {
    const newFact = {
      id: `local-${Date.now()}`,
      fact: factText,
      length: factText.length,
      isLocal: true,
    }
    setLocalFacts(prev => [newFact, ...prev])
  }

  const handleEditFact = (updatedText) => {
    setLocalFacts(prev =>
      prev.map(fact =>
        fact.id === editingFact.id
          ? { ...fact, fact: updatedText, length: updatedText.length }
          : fact
      )
    )
    setEditingFact(null)
  }

  const handleDeleteFact = (id) => {
    if (window.confirm('Yakin ingin menghapus fakta ini?')) {
      setLocalFacts(prev => prev.filter(fact => fact.id !== id))
      if (editingFact?.id === id) setEditingFact(null)
    }
  }

  const handleStartEdit = (fact) => {
    setEditingFact(fact)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingFact(null)
  }

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="home-hero text-white rounded-4 p-5 mb-5 text-center">
        <h1 className="display-4 fw-bold mb-2">🐱 Fakta Kucing</h1>
        <p className="lead mb-0">
          Kumpulan fakta menarik tentang kucing dan buatan kamu sendiri
        </p>
      </div>

      {/* Form Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-lg-8">
          <FactForm
            onSubmit={editingFact ? handleEditFact : handleAddFact}
            editingFact={editingFact}
            onCancel={handleCancelEdit}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <span className="fw-semibold text-muted">
            Total: <span className="text-warning fw-bold fs-5">{allFacts.length}</span> fakta
          </span>
          {localFacts.length > 0 && (
            <span className="badge bg-primary ms-2 rounded-pill">
              {localFacts.length} buatan kamu
            </span>
          )}
        </div>
        <button className="btn btn-outline-dark btn-sm rounded-pill" onClick={refetch}>
          🔄 Refresh API
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted fw-semibold">Memuat fakta kucing...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && allFacts.length === 0 && (
        <div className="text-center py-5">
          <h2 className="text-muted">😿</h2>
          <p className="text-muted fs-5">Belum ada fakta. Tambahkan fakta buatanmu di atas!</p>
        </div>
      )}

      {/* Facts Grid */}
      {!loading && allFacts.length > 0 && (
        <div className="row g-4">
          {allFacts.map((fact) => (
            <FactCard
              key={fact.id}
              fact={fact}
              onEdit={handleStartEdit}
              onDelete={handleDeleteFact}
            />
          ))}
        </div>
      )}
    </div>
  )
}