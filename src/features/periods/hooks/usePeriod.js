import { useState, useEffect }  from 'react'
import { getPeriod } from '../services/periods.api.js'

const usePeriod = () => {
    const [period, setPeriod] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const loadPeriod = async () => {
            setLoading(true)
            setError(null)

            try {
                const data = await getPeriod()
                if(isMounted) setPeriod(data)
            } catch (err) {
                if (isMounted) setError(err.message || 'Error fetching period')
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        loadPeriod()

        return () => { isMounted = false }
    }, [])

    return { period, loading, error }
}

export default usePeriod