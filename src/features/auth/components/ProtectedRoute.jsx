import { Navigate } from 'react-router'
import { useAuthContext } from '../hooks/useAuthContext'
import Spinner from '@components/Spinner'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext()
  
 if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Spinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default ProtectedRoute