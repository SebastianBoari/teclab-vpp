export const isEligibleGroup = (groups, studentCareer) => {
    return groups.filter(group =>
      group.eligible_careers.some(career => career === studentCareer)
    )
}