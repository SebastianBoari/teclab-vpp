export const adaptTutorFromAPI = (apiTutor) => {
    if(!apiTutor) return null

    return {
        id: apiTutor.id,
        createdAt: apiTutor.created_at,
        firstName: apiTutor.first_name,
        lastName: apiTutor.last_name,
        email: apiTutor.email,
        dni: apiTutor.dni
    }
}

export const adaptTutorsFromAPI = (apiTutors) => {
    return apiTutors?.map(adaptTutorFromAPI) || []
}