import { useState, useMemo } from 'react'
import { AdminContext } from './admin.context'

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState([])

  const value = useMemo(() => ({
    admin, 
    setAdmin,
  }), [admin, setAdmin])

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}