import { useQuery } from '@tanstack/react-query'
import { getStudents } from '../services/students.api.js'

const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  })
}
export default useStudents
