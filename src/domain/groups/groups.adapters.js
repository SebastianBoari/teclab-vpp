export const adaptGroupFromAPI = (apiGroup) => {
    if (!apiGroup) return null

    return {
    id: apiGroup.id,
    createdAt: apiGroup.created_at,
    name: apiGroup.group_name,
    category: apiGroup.category,
    periodId: apiGroup.period_id,
    capacity: apiGroup.capacity,
    linkMeet: apiGroup.link_meet,
    linkWhapp: apiGroup.link_whapp,
    linkDrive: apiGroup.link_drive,
    tutorId: apiGroup.tutor_id,
    schedule: apiGroup.schedule || [],
    eligibleCareers: apiGroup.eligible_careers || [],
  }
}

export const adaptGroupsFromAPI = (apiGroups) => {
  return apiGroups?.map(adaptGroupFromAPI) || []
}