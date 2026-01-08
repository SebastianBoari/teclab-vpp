import { useQuery } from '@tanstack/react-query'
import { getEnrollment } from '../services/enrollment.api.js'

const useEnrollment = ({ id, studentId, periodId } = {}) => {
  const isEnabled = !!id || (!!studentId && !!periodId)

  return useQuery({
    queryKey: ['enrollment', { id, studentId, periodId }],
    queryFn: () => getEnrollment({ id, studentId, periodId }),
    enabled: isEnabled,
    retry: false,
    staleTime: 0, 
  })
}

export default useEnrollment