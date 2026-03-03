import { useQuery } from '@tanstack/react-query'
import { getTutors } from '../services/tutors.api.js'

const useTutors = () => {
  return useQuery({
    queryKey: ['tutors'],
    queryFn: getTutors,
  })
}
export default useTutors
