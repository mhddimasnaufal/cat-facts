import { useState, useEffect } from 'react'

export default function FactForm({ onSubmit, editingFact, onCancel }) {
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingFact) {
      setText(editingFact.fact)
    } else {
      setText('')
    }
    setErrors({})
  }, [editingFact])

  const validate = (value) => {
    const newErrors = {}
    const trimmed = value.trim()

    if (!trimmed) {
      newErrors.empty = 'Fakta tidak boleh kosong!'
    } else {
      if (trimmed.length < 5) {
        newErrors.minLength = 'Minimal 5 karakter!'
      }
      if (trimmed.length > 200) {
        newErrors.maxLength = 'Maksimal 200 karakter!'
      }
    }
    return newErrors
  }

  const handleChange = (e) => {
    const value = e.target.value
    setText(value)
    if (Object.keys(errors).length > 0) {
      setErrors(validate(value))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(text)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(text.trim())
      setText('')
      setErrors({})
    }
  }

  const handleCancel = () => {
    setText('')
    setErrors({})
    if (onCancel) onCancel()
  }

  const charCount = text.length
  const isOverLimit = charCount > 200
  const hasErrors = Object.keys(errors).length > 0

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">
          {editingFact ? '✏️ Edit Fakta Kamu' : '➕ Tambah Fakta Baru'}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="factInput" className="form-label fw-semibold">
              Tulis fakta kucing versi kamu
            </label>
            <textarea
              id="factInput"
              className={`form-control ${hasErrors || isOverLimit ? 'is-invalid' : ''}`}
              value={text}
              onChange={handleChange}
              placeholder="Contoh: Kucing saya suka tidur di atas laptop sambil mendengkur..."
              rows="3"
            ></textarea>

            {/* Error Messages */}
            {errors.empty && (
              <div className="alert alert-danger py-1 px-2 mt-2 mb-0" role="alert">
                ⚠️ {errors.empty}
              </div>
            )}
            {errors.minLength && (
              <div className="alert alert-danger py-1 px-2 mt-2 mb-0" role="alert">
                ⚠️ {errors.minLength}
              </div>
            )}
            {errors.maxLength && (
              <div className="alert alert-danger py-1 px-2 mt-2 mb-0" role="alert">
                ⚠️ {errors.maxLength}
              </div>
            )}

            <div className="d-flex justify-content-between mt-1">
              <div></div>
              <small className={isOverLimit ? 'text-danger fw-bold' : 'text-muted'}>
                {charCount}/200
              </small>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-warning fw-semibold">
              {editingFact ? '💾 Simpan Perubahan' : '➕ Tambah Fakta'}
            </button>
            {editingFact && (
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                ❌ Batal
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}