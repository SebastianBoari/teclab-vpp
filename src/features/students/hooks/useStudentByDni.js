import { useQuery } from '@tanstack/react-query'
import { getStudentByDni } from '../services/students.api.js'

const useStudentByDni = (dni) => {
  return useQuery({
    queryKey: ['student', dni],
    queryFn: () => getStudentByDni(dni),
    enabled: !!dni,
    retry: 1,                    
    staleTime: 0,                
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,    
  })
}

export default useStudentByDni