import { useState, useEffect } from 'react'
import { fetchGroupById } from '@/features/groups/services/groups.api.js'

export function useGroupById(id) {
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    let isMounted = true

    async function loadGroup() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchGroupById(id)
        if (isMounted) setGroup(data)
      } catch (err) {
        if (isMounted) setError(err.message || 'Error fetching group')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadGroup()
    
    return () => { isMounted = false }
  }, [id])

  return { group, loading, error }
}
