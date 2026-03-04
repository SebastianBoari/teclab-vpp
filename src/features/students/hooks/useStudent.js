import { useQuery } from '@tanstack/react-query'
import { getStudent } from '../services/students.api.js'

const useStudent = ({ id }) => {
  return useQuery({
    queryKey: ['student', id],
    queryFn: () => getStudent({ id }),
    enabled: !!id,
  })
}
export default useStudent
