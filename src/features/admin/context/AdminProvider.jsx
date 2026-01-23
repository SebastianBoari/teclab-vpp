import { AdminContext } from './admin.context'

export const AdminProvider = ({ children }) => {
  const value = ''

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}