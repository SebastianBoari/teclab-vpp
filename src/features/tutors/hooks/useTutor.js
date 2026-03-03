import { useQuery } from '@tanstack/react-query'
import { getTutor } from '../services/tutors.api.js'

const useTutor = ({ id }) => {
  return useQuery({
    queryKey: ['tutor', id],
    queryFn: () => getTutor({ id }),
    enabled: !!id,
  })
}
export default useTutor
