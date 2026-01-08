import { useQuery } from '@tanstack/react-query'
import { getPeriod } from '../services/periods.api.js'

const usePeriod = ({ id, isEnrollmentOpen } = {}) => {
    return useQuery({
        queryKey: ['period', { id, isEnrollmentOpen }],
        queryFn: () => getPeriod({ id, isEnrollmentOpen }),
        retry: 1, 
    })
}

export default usePeriod