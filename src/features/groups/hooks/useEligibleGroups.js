import { useState, useEffect } from 'react'
import useGroups from './useGroups'

const getEligibleGroups = (groups, studentCareer) => {
  return groups.filter((group) => {
    return group.eligible_careers?.some((career) => {
      return career === studentCareer
    })
  })
}

const getActiveGroups = (groups) => {
  return groups.filter((group) => {
    return group.periods?.isActive === true
  })
}

const useEligibleGroups = (careerId) => {
  const { groups, loading, error } = useGroups()
  const [eligibleGroups, setEligibleGroups] = useState([])

  useEffect(() => {
    if (loading || error || !Array.isArray(groups)) return

    const active = getActiveGroups(groups)
    const eligible = getEligibleGroups(active, careerId)

    setEligibleGroups(eligible)
  }, [groups, loading, error, careerId])

  return { eligibleGroups, loading, error }
}

export default useEligibleGroups
