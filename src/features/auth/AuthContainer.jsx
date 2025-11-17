import { Navigate } from 'react-router'
import { AuthProvider } from './context/AuthProvider.jsx'
import { useAuthContext } from './hooks/useAuthContext.js'

const ProtectedRoute = ({ children }) => {
  const { session } = useAuthContext()
  
  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}

const AuthContainer = ({ children }) => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        {children}
      </ProtectedRoute>
    </AuthProvider>
  )
}

export default AuthContainer