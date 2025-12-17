export const adaptCareerFromAPI = (apiCareer) => {
    if (!apiCareer) return null

    return {
    id: apiCareer.id,
    createdAt: apiCareer.created_at,
    name: apiCareer.name,
    }
}

export const adaptCareersFromAPI = (apiCareers) => {
  return apiCareers?.map(adaptCareerFromAPI) || []
}