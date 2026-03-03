import { useQuery } from '@tanstack/react-query'
import { getCareer } from '../services/careers.api.js'

const useCareer = ({ id } = {}) => {
  return useQuery({
    queryKey: ['career', { id }],
    queryFn: () => getCareer({ id }),
    retry: 1,
  })
}

export default useCareer
