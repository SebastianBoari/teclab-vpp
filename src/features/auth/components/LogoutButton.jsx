import { useNavigate } from 'react-router'
import { useLogout } from '../hooks/useAuth'

const LogoutButton = () => {
  const navigate = useNavigate()
  const { mutate: logout, isPending } = useLogout()

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/admin/login', { replace: true })
      },
      onError: (error) => {
        console.error('Error al cerrar sesión:', error)
      }
    })
  }

  return (
    <button 
      onClick={handleLogout}
      disabled={isPending}
      className="disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
    </button>
  )
}

export default LogoutButton