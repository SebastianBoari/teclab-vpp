import { useQuery } from '@tanstack/react-query'
import { getCareers } from '../services/careers.api.js'

const usePeriods = () => {
  return useQuery({
    queryKey: ['careers'],
    queryFn: () => getCareers(),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  })
}

export default usePeriods
