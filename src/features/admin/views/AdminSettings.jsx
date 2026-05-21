import Header from '@common/layout/Header'
import LogoutButton from '@features/auth/components/LogoutButton'
import { useNavigate } from 'react-router'

const AdminSettings = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/admin')
  }

  return (
    <section>
      <Header title="Ajustes de Administración" sticky={true} onBack={handleBack} />

      <LogoutButton />
    </section>
  )
}

export default AdminSettings
