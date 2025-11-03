import { useState, useEffect } from 'react'
import { getGroups } from '../services/groups.api.js'

export function useGroups() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadGroups() {
      setLoading(true)
      setError(null)

      try {
        const data = await getGroups()
        if (isMounted) setGroups(data)
      } catch (err) {
        if (isMounted) setError(err.message || 'Error fetching groups')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadGroups()

    return () => { isMounted = false }
  }, [])

  return { groups, loading, error }
}
