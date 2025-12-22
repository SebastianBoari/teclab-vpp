import { getDaysRemaining } from '@utils/date.utils'


export const adaptPeriodFromAPI = (apiPeriod) => {
    if (!apiPeriod) return null
        
    return {
        id: apiPeriod.id,
        createdAt: apiPeriod.created_at,
        name: apiPeriod.name,
        isActive: apiPeriod.is_active,
        startAt: apiPeriod.start_at,
        endAt: apiPeriod.end_at,
        enrollmentCloseAt: apiPeriod.enrollment_close_at,
        daysRemaining: apiPeriod?.enrollment_close_at ? getDaysRemaining(apiPeriod?.enrollment_close_at) : null
    }
}

export const adaptPeriodsFromAPI = (apiPeriods) => {
    return apiPeriods?.map(adaptPeriodFromAPI) || []
}