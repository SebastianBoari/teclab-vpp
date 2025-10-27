import { useState, useCallback } from 'react'
import { createGroup } from '@/features/groups/services/groups.api.js'

const useCreateGroup = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [createdGroup, setCreatedGroup] = useState(null)

  const handleCreateGroup = useCallback(async (newGroup) => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await createGroup(newGroup)
      setCreatedGroup(data)
      return data
    } catch (err) {
      setError(err.message || 'Error creating group')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { createGroup: handleCreateGroup, createdGroup, loading, error }
}

export default useCreateGroup