import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'https://catfact.ninja'

export function useCatFacts() {
  const [apiFacts, setApiFacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFacts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${BASE_URL}/facts?limit=10`)
      const factsWithId = response.data.data.map((fact, index) => ({
        ...fact,
        id: `api-${index}-${Date.now()}`,
        isLocal: false,
      }))
      setApiFacts(factsWithId)
    } catch (err) {
      setError('Gagal mengambil data dari Cat Facts API. Periksa koneksi internet Anda.')
      console.error('Error fetching facts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFacts()
  }, [])

  return { apiFacts, loading, error, refetch: fetchFacts }
}