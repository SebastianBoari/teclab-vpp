import { useQuery } from '@tanstack/react-query'
import { getEnrolledGroup } from '../services/enrollment.api.js'

export const useEnrolledGroup = (studentId, periodId) => {
  return useQuery({
    queryKey: ['enrolledGroup', studentId, periodId],
    queryFn: () => getEnrolledGroup({ studentId, periodId }),
    enabled: !!studentId && !!periodId,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}