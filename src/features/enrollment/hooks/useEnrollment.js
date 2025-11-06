import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEnrollment } from '../services/enrollment.api.js'

export const useEnrollment = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ studentId, groupId }) => {
      return await createEnrollment(studentId, groupId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] })
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
    onError: (error) => {
      console.error('Enrollment failed:', error.message)
    }
  })

  return {
    enroll: mutation.mutate,
    enrollAsync: mutation.mutateAsync, 
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data
  }
}
