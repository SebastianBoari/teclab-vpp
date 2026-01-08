import { useQuery } from '@tanstack/react-query'
import { getEnrollments } from '../services/enrollment.api.js'

const useEnrollments = ({ studentId, groupId, periodId } = {}) => {
  return useQuery({
    queryKey: ['enrollments', { studentId, groupId, periodId }],
    queryFn: () => getEnrollments({ studentId, groupId, periodId }),
    retry: 1,
    staleTime: 1000 * 60, 
    refetchOnWindowFocus: false
  })
}

export default useEnrollments