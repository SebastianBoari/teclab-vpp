import { useQuery } from '@tanstack/react-query'
import { getPeriod } from '../services/periods.api.js'

const usePeriod = () => {
    return useQuery({
        queryKey: ['period'],
        queryFn: getPeriod,
        retry: 1, 
    })
}

export default usePeriod