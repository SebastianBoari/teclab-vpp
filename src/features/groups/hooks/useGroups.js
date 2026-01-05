import { useQuery } from '@tanstack/react-query'
import { getGroups } from '../services/groups.api.js'

const useGroups = ({isActive = null, studentCareerId }) => {
  const { data: groups, isLoading, error } = useQuery({
    queryKey: ['groups', isActive],
    queryFn: () => getGroups({ isActive, studentCareerId }),
  })

  return { 
    groups: groups || [],
    loading: isLoading,
    error
  }
}

export default useGroups