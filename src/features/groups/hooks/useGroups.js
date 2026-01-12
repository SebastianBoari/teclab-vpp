import { useQuery } from '@tanstack/react-query'
import { getGroups } from '../services/groups.api.js'

const useGroups = ({ periodId, careerId } = {}) => {
  return useQuery({
    queryKey: ['groups', { periodId, careerId }],
    queryFn: () => getGroups({ periodId, careerId }),
    enabled: !!periodId, 
    staleTime: 0,
    refetchOnWindowFocus: true
  })
}

export default useGroups