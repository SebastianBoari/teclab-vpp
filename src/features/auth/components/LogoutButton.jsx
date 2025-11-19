import { useLogout } from '../hooks/useAuth'
import Button from '@/shared/ui/Button'
import { notify } from '@/utils/utils'

const LogoutButton = ({ className = '' }) => {
  const { mutate: logout, isPending } = useLogout()

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        notify('success', 'Sesión cerrada exitosamente')
      },
      onError: (error) => {
        notify('error', error?.message || 'Error al cerrar sesión')
      }
    })
  }

  return (
    <Button 
      message={isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
      onClick={handleLogout}
      disabled={isPending}
      className={className}
    />
  )
}

export default LogoutButton