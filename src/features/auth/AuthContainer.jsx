import ProtectedRoute from './components/ProtectedRoute.jsx'

const AuthContainer = ({ children }) => {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  )
}

export default AuthContainer