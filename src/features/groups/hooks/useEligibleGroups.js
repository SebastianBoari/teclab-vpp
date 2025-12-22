import { useMemo } from 'react'
import useGroups from './useGroups'
import { filterEligibleGroups } from '@domain/groups/groups.domain'

const useEligibleGroups = (studentCareerId) => {
  const { groups, loading, error } = useGroups(true)

  const eligibleGroups = useMemo(() => {
    if (!studentCareerId || !groups.length) return []
    return filterEligibleGroups(groups, studentCareerId)
  }, [groups, studentCareerId])

  return {
    eligibleGroups,
    loading,
    error
  }
}

export default useEligibleGroups