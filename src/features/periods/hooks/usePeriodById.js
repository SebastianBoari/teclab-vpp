import { useState, useEffect } from 'react'
import { getPeriodById } from '../services/periods.api.js'

const usePeriodById = (id) => {
    const [period, setPeriod] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      let isMounted = true

      async function loadPeriod() {
        setLoading(true)
        setError(null)

        try {
          const data = await getPeriodById(id)
          if (isMounted) setPeriod(data)
        } catch (err) {
          if (isMounted) setError(err.message || 'Error fetching period by id')
        } finally {
          if (isMounted) setLoading(false)
        }
      }

      loadPeriod()

      return () => { isMounted = false }
    }, [id])
    
  return { period, loading, error }
}

export default usePeriodById