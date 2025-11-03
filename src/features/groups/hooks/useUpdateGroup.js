import { useState, useCallback } from 'react'
import { updateGroup } from '../services/groups.api.js'

export function useUpdateGroup() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [updatedGroup, setUpdatedGroup] = useState(null)

  const handleUpdateGroup = useCallback(async (id, updates) => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await updateGroup(id, updates)
      setUpdatedGroup(data)
      return data
    } catch (err) {
      setError(err.message || 'Error updating group')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { updateGroup: handleUpdateGroup, updatedGroup, loading, error }
}
