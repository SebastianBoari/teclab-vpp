import { useQuery } from '@tanstack/react-query'
import { getGroups } from '../services/groups.api'
import { filterEligibleGroups } from '@domain/groups/groups.domain'

const useEligibleGroups = (studentCareerId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['groups', true],
    queryFn: () => getGroups(true),
    enabled: !!studentCareerId
  })

  const eligibleGroups = data 
    ? filterEligibleGroups(data, studentCareerId)
    : []

  return {
    eligibleGroups,
    loading: isLoading,
    error
  }
}

export default useEligibleGroups