import { useQuery } from '@tanstack/react-query'
import { getStudent } from '../services/students.api.js'

const useStudent = ({ id, dni } = {}) => {
    const isEnabled = !!id || !!dni
  return useQuery({
    queryKey: ['student', { id, dni }],
    queryFn: () => getStudent({ id, dni }),
    enabled: isEnabled,
    retry: false,                    
    staleTime: 1000 * 60 * 5,                
    refetchOnWindowFocus: false,    
  })
}

export default useStudent