import { adaptTutorFromAPI } from '@domain/tutors/tutors.adapters.js'
import { adaptPeriodFromAPI } from '@domain/periods/periods.adapters.js'

export const adaptGroupFromAPI = (apiGroup) => {
    if (!apiGroup) return null
  
    return {
    id: apiGroup.id,
    createdAt: apiGroup.created_at,
    name: apiGroup.group_name,
    category: apiGroup.category,
    period: apiGroup.periods ? adaptPeriodFromAPI(apiGroup.periods) : null,
    capacity: apiGroup.capacity,
    linkMeet: apiGroup.link_meet,
    linkWhapp: apiGroup.link_whapp,
    linkDrive: apiGroup.link_drive,
    tutor: apiGroup.tutors ? adaptTutorFromAPI(apiGroup.tutors) : null,
    schedule: apiGroup.schedule || [],
    eligibleCareers: apiGroup.eligible_careers || [],
  }
}

export const adaptGroupsFromAPI = (apiGroups) => {
  return apiGroups?.map(adaptGroupFromAPI) || []
}