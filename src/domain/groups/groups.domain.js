export const isGroupEligibleForStudent =(group, studentCareerId) => { 
  return group.eligible_careers?.includes(studentCareerId) ?? false
}

export const filterEligibleGroups = (groups, studentCareerId) =>{
  return groups.filter(group => 
    this.isGroupEligibleForStudent(group, studentCareerId)
  )
}