export const isGroupEligibleForStudent =(group, studentCareerId) => { 
  return group.eligibleCareers?.includes(studentCareerId) ?? false
}

export const filterEligibleGroups = (groups, studentCareerId) =>{
  if(!studentCareerId || !groups) return []

  return groups.filter(group => 
    isGroupEligibleForStudent(group, studentCareerId)
  )
}