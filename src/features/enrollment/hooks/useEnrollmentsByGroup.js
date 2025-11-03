import { useState, useEffect } from 'react'
import { getEnrollmentsByGroup } from '../services/enrollment.api.js'

export function useEnrollmentsByGroup(groupId) {
    const [enrollments, setEnrollments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      let isMounted = true

      async function loadEnrollments() {
        setLoading(true)
        setError(null)

        try {
          const data = await getEnrollmentsByGroup(groupId)
          if (isMounted) setEnrollments(data)
        } catch (err) {
          if (isMounted) setError(err.message || 'Error fetching enrollments')
        } finally {
          if (isMounted) setLoading(false)
        }
      }

      loadEnrollments()

      return () => { isMounted = false }
    }, [])

    return { enrollments, loading, error }
}