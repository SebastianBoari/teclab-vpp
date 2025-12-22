import { useState, useMemo } from 'react'
import { AdminContext } from './admin.context'
import { usePeriods } from '@features/periods/hooks/usePeriods'
import { useGroups } from '@features/groups/hooks/useGroups'

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState([])
  const { periods, periodsLoading, periodsError } = usePeriods()
  const { groups, groupsLoading, groupsError } = useGroups()
  
  const value = useMemo(() => ({
    admin, 
    setAdmin,
    periods,
    periodsLoading,
    periodsError,
    groups,
    groupsLoading,
    groupsError
  }), [admin, setAdmin, periods, periodsLoading, periodsError, groups, groupsLoading, groupsError])

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}