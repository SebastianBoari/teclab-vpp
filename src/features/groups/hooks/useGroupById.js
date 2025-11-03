import { useState, useEffect } from 'react'
import { getGroupById } from '../services/groups.api.js'

const useGroupById = (id) => {
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
        const data = await getGroupById(id)
        if (isMounted) setGroup(data)
      } catch (err) {
        if (isMounted) setError(err.message || 'Error fetching group by id')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadGroup()
    
    return () => { isMounted = false }
  }, [id])

  return { group, loading, error }
}

export default useGroupById