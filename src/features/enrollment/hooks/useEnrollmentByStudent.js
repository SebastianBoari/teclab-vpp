import { useQuery } from '@tanstack/react-query'
import { getEnrollmentByStudent } from '../services/enrollment.api.js'

export const useEnrollmentByStudent = (studentId) => {
  return useQuery({
    queryKey: ['enrollment', studentId],
    queryFn: () => getEnrollmentByStudent(studentId),
    enabled: !!studentId,
  })
}
