// Logica de dominio relacionada a los grupos

// Supuestos:
// - Tenemos id del estudiante
// - Tenemos id de la carrera del estudiante
// - Tenemos el listado de grupos ACTIVOS (is_active = true)
export const isGroupEligibleForStudent =(group, studentCareerId) => { 
  return group.eligible_careers?.includes(studentCareerId) ?? false
}

export const filterEligibleGroups = (groups, studentCareerId) =>{
  if(!studentCareerId || !groups) return []

  return groups.filter(group => 
    this.isGroupEligibleForStudent(group, studentCareerId)
  )
}