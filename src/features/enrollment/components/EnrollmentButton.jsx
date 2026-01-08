import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useEnrollmentContext } from '../hooks/useEnrollmentContext'
import { notify } from '@utils/notify.utils'

const EnrollmentButton = ({ group }) => {
  const navigate = useNavigate()
  const { enrollStudent } = useEnrollmentContext()
  const [isLocalLoading, setIsLocalLoading] = useState(false)

  const handleClick = async () => {
    setIsLocalLoading(true)
    try {
      await enrollStudent(group.id)
      
      notify('success', 'Inscripción exitosa')
      navigate('/inscripcion/confirmacion')

    } catch (error) {
      notify('error', 'No se pudo realizar la inscripción. Intente nuevamente.')
      console.error('Enrollment error:', error)
    } finally {
      setIsLocalLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLocalLoading}
      className="w-full bg-primary text-white font-medium py-2.5 rounded-lg text-sm transition-colors hover:bg-primary/90 mt-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      {isLocalLoading ? 'Procesando...' : 'Seleccionar Grupo'} 
    </button>
  )
}

export default EnrollmentButton