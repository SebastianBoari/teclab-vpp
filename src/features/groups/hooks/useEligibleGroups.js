import { useState, useEffect } from 'react'
import useGroups from './useGroups'
import { GroupsDomain } from '@domain/groups/groups.domain'

const getEligibleGroups = (groups, studentCareer) => {
  return groups.filter((group) => {
    return group.eligible_careers?.some((career) => {
      return career === studentCareer
    })
  })
}

const useEligibleGroups = (careerId) => {
  const { groups, loading, error } = useGroups(true)
  const [eligibleGroups, setEligibleGroups] = useState([])

  useEffect(() => {
    if (loading || error || !Array.isArray(groups)) return
    
    console.log(groups)
    const eligible = getEligibleGroups(groups, careerId)
  
    setEligibleGroups(eligible)
  }, [groups, loading, error, careerId])

  return { eligibleGroups, loading, error }
}

export default useEligibleGroups
