import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'

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