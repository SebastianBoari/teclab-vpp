import { useQuery } from '@tanstack/react-query'
import { getGroups } from '../services/groups.api.js'

const useGroups = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: ['groups', filters],
    queryFn: () => getGroups(filters),
    staleTime: 0,
    refetchOnWindowFocus: true,
    ...options,
  })
}

export default useGroups
