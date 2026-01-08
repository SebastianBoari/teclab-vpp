import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEnrollment } from '../services/enrollment.api.js'

export const useEnroll = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollment'] }) 
      queryClient.invalidateQueries({ queryKey: ['enrollments'] })
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
    onError: (error) => {
        console.error('Error al inscribir:', error) 
    }
  })
}

export default useEnroll