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
    }
}

export const adaptPeriodsFromAPI = (apiPeriods) => {
    return apiPeriods?.map(adaptPeriodFromAPI) || []
}