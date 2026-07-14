import { Link } from 'react-router-dom'

export default function FactCard({ fact, onEdit, onDelete }) {
  const getLengthCategory = (length) => {
    if (length < 30) return { label: 'Pendek', badge: 'bg-success' }
    if (length <= 60) return { label: 'Sedang', badge: 'bg-warning text-dark' }
    return { label: 'Panjang', badge: 'bg-danger' }
  }

  const category = getLengthCategory(fact.length)

  return (
    <div className="col-12 col-md-6">
      <div className="card cat-card h-100 shadow-sm border-0">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
            <div className="d-flex gap-2 flex-wrap">
              <span className={`badge ${category.badge} rounded-pill`}>
                {category.label}
              </span>
              <span className="badge bg-secondary rounded-pill">
                {fact.length} karakter
              </span>
            </div>
            {fact.isLocal && (
              <span className="badge bg-primary rounded-pill">
                ✏️ Buatan Kamu
              </span>
            )}
          </div>

          <p className="card-text fact-text text-muted flex-grow-1 mb-3">
            {fact.fact}
          </p>

          <div className="d-flex justify-content-between align-items-center pt-2 border-top">
            <Link
              to={`/detail/${fact.id}`}
              state={{ fact }}
              className="btn btn-sm btn-outline-warning"
            >
              📖 Detail
            </Link>

            {fact.isLocal && (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-info"
                  onClick={() => onEdit(fact)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(fact.id)}
                >
                  🗑️ Hapus
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}