import { useEffect } from 'react'
import { useEnrollment } from '../hooks/useEnrollment.js'
import { useEnrollmentContext } from '../context/useEnrollmentContext.js'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

const EnrollmentButton = ({ studentId, group }) => {
  const { id: groupId } = group

  const { enroll, isLoading, isError, isSuccess } = useEnrollment()
  const { setSelectedGroup } = useEnrollmentContext()
  const navigate = useNavigate()

  const handleClick = () => {
    enroll({ studentId: studentId, groupId: groupId })
  }

  const notify = (status, message) => {
    toast[status](message)
  }

  const getButtonText = () => {
    if (isLoading) return 'Cargando...'
    if (isSuccess) return 'Inscripto!'
    if (isError) return 'Reintentar inscripción'
    return 'Seleccionar grupo'
  }

  useEffect(() => {
    if(isError) notify('error', 'Error en la inscripción')
    
    if(isSuccess) {
      setSelectedGroup(group)
      notify('success', 'Inscripción exitosa')
      navigate('/inscripcion/confirmacion')
    }
  }, [isSuccess, isError])

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading || isSuccess}
        className="w-full bg-primary text-white font-medium py-2.5 rounded-lg text-sm transition-colors hover:bg-primary/90 mt-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {getButtonText()}
      </button>
    </>
  )
}

export default EnrollmentButton