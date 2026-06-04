import { useQuery } from '@tanstack/react-query'
import { getStudent } from '../services/students.api.js'

const useStudent = ({ field, value }) => {
  return useQuery({
    queryKey: ['student', field, value],
    queryFn: () => getStudent({ field, value }),
    enabled: !!field && !!value,
  })
}
export default useStudent
