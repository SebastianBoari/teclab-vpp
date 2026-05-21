import { useQuery } from '@tanstack/react-query'
import { getStudents } from '../services/students.api.js'

const useStudents = ({ page = 1, search = '' }) => {
  return useQuery({
    queryKey: ['students', { page, search }],
    queryFn: () => getStudents({ page, pageSize: 10, search }),
    placeholderData: (previousData) => previousData,
  })
}

export default useStudents
