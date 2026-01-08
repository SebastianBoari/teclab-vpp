import { useQuery } from '@tanstack/react-query'
import { getPeriods } from '../services/periods.api.js'

const usePeriods = ({ isActive } = {}) => {
    return useQuery({
        queryKey: ['periods', { isActive }],
        queryFn: () => getPeriods({ isActive }),
        retry: 1,
        staleTime: 1000 * 60 * 5
    })
}

export default usePeriods