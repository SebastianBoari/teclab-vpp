import { useState, useEffect } from 'react'
import { getPeriodsByYear } from '../services/periods.api.js'

const usePeriodByYear = (year) => {
    const [period, setPeriod] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      let isMounted = true

      async function loadPeriods() {
        setLoading(true)
        setError(null)

        try {
          const data = await getPeriodsByYear(year)
          if (isMounted) setPeriod(data)
        } catch (err) {
          if (isMounted) setError(err.message || 'Error fetching periods by year')
        } finally {
          if (isMounted) setLoading(false)
        }
      }

      loadPeriods()

      return () => { isMounted = false }
    }, [year])
    
  return { period, loading, error }
}

export default usePeriodByYear