import { AdminContext } from './admin.context'

export const AdminProvider = ({ children }) => {
  const value = useMemo(() => ({
    // A completar
  }), [])

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}