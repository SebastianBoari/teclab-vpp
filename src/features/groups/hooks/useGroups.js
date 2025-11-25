import { useQuery } from '@tanstack/react-query'
import { getGroups } from '../services/groups.api.js'

const useGroups = (isActive = null) => {
  const { data: groups, isLoading, error } = useQuery({
    queryKey: ['groups', true],
    queryFn: () => getGroups(isActive),
  })

    return {
    groups,
    loading: isLoading,
    error
  }
}

export default useGroups