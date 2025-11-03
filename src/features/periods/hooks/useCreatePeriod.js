import { useState, useEffect } from 'react'
import { createPeriod } from '../services/periods.api.js'

const useCreatePeriod = (newPeriod) => {
    const [period, setPeriod] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      let isMounted = true

      async function addPeriod() {
        setLoading(true)
        setError(null)

        try {
          const data = await createPeriod(newPeriod)
          if (isMounted) setPeriod(data)
        } catch (err) {
          if (isMounted) setError(err.message || 'Error creating period')
        } finally {
          if (isMounted) setLoading(false)
        }
      }

      addPeriod()

      return () => { isMounted = false }
    }, [newPeriod])
    
  return { period, loading, error }
}

export default useCreatePeriod