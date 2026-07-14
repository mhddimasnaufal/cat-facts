import { useLocation, useParams, Link } from 'react-router-dom'

export default function DetailPage() {
  const { id } = useParams()
  const location = useLocation()
  const fact = location.state?.fact || null

  if (!fact) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning d-inline-block px-5 py-4 rounded-4 shadow-sm">
          <h4 className="alert-heading">😿 Fakta Tidak Ditemukan!</h4>
          <p className="mb-3">Data fakta tidak tersedia atau telah dihapus.</p>
          <Link to="/" className="btn btn-warning rounded-pill fw-semibold">
            ⬅️ Kembali ke Home
          </Link>
        </div>
      </div>
    )
  }

  const getLengthCategory = (length) => {
    if (length < 30) return { label: 'Pendek', badge: 'bg-success', icon: '🐣' }
    if (length <= 60) return { label: 'Sedang', badge: 'bg-warning text-dark', icon: '🐱' }
    return { label: 'Panjang', badge: 'bg-danger', icon: '🦁' }
  }

  const category = getLengthCategory(fact.length)

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow border-0 rounded-4">
            <div className="card-body p-5">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h2 className="fw-bold mb-0">📖 Detail Fakta</h2>
                <div className="d-flex gap-2">
                  <span className={`badge ${category.badge} rounded-pill fs-6`}>
                    {category.icon} {category.label}
                  </span>
                  <span className="badge bg-secondary rounded-pill fs-6">
                    {fact.length} karakter
                  </span>
                  {fact.isLocal && (
                    <span className="badge bg-primary rounded-pill fs-6">
                      ✏️ Buatan Kamu
                    </span>
                  )}
                </div>
              </div>

              {/* Fact Content */}
              <div className="bg-light rounded-4 p-4 mb-4">
                <p className="fact-text fs-5 mb-0" style={{ lineHeight: '1.8' }}>
                  {fact.fact}
                </p>
              </div>

              {/* Info */}
              <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                  <div className="bg-success bg-opacity-10 rounded-3 p-3 text-center">
                    <h6 className="text-success mb-1">ID</h6>
                    <small className="text-muted">{fact.id}</small>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="bg-info bg-opacity-10 rounded-3 p-3 text-center">
                    <h6 className="text-info mb-1">Panjang</h6>
                    <strong>{fact.length} karakter</strong>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="bg-warning bg-opacity-10 rounded-3 p-3 text-center">
                    <h6 className="text-warning mb-1">Kategori</h6>
                    <strong>{category.icon} {category.label}</strong>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="bg-primary bg-opacity-10 rounded-3 p-3 text-center">
                    <h6 className="text-primary mb-1">Sumber</h6>
                    <strong>{fact.isLocal ? 'Buatan Kamu' : 'API'}</strong>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <Link to="/" className="btn btn-warning btn-lg rounded-pill fw-semibold">
                ⬅️ Kembali ke Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}