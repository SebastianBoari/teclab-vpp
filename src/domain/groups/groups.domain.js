export class GroupsDomain {
  static isGroupEligibleForStudent(group, studentCareerId) {
    return group.eligible_careers?.includes(studentCareerId) ?? false
  }
  
  static filterEligibleGroups(groups, studentCareerId) {
    return groups.filter(group => 
      this.isGroupEligibleForStudent(group, studentCareerId)
    )
  }
}