import { useEffect } from 'react'
import { useEnrollment } from '../hooks/useEnrollment.js'
import { useEnrollmentContext } from '../hooks/useEnrollmentContext'
import { useNavigate } from 'react-router'
import { notify } from '@/utils/utils'

const EnrollmentButton = ({ studentId, group }) => {
  const { setSelectedGroup } = useEnrollmentContext()
  const { id: groupId } = group
  const { 
    enroll, 
    isLoading: isEnrollmentLoading, 
    isError: isEnrollmentError, 
    isSuccess: isEnrollmentSuccess 
  } = useEnrollment()

  const navigate = useNavigate()
  
  useEffect(() => {
    if(isEnrollmentError) notify('error', 'Error en la inscripción')
    
    if(isEnrollmentSuccess) {
      setSelectedGroup(group)
      notify('success', 'Inscripción exitosa')
      navigate('/inscripcion/confirmacion')
    }
  }, [setSelectedGroup, group, navigate, isEnrollmentError, isEnrollmentSuccess])

  const handleClick = () => {
    enroll({ studentId: studentId, groupId: groupId })
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isEnrollmentLoading || isEnrollmentSuccess}
        className="w-full bg-primary text-white font-medium py-2.5 rounded-lg text-sm transition-colors hover:bg-primary/90 mt-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isEnrollmentLoading ? 'Cargando...' : 'Seleccionar Grupo'} 
      </button>
    </>
  )
}

export default EnrollmentButton