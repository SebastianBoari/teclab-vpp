import { useEnrollment } from '../hooks/useEnrollment.js'

const EnrollmentButton = ({ studentId, groupId }) => {
  const { enroll, isLoading, isError, isSuccess } = useEnrollment()

  const handleClick = () => {
    enroll({ studentId: studentId, groupId: groupId })
  }

  const getButtonText = () => {
    if (isLoading) return 'Cargando...'
    if (isSuccess) return 'Inscripto!'
    if (isError) return 'Reintentar inscripción'
    return 'Seleccionar grupo'
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading || isSuccess}
        className="w-full bg-primary text-white font-medium py-2.5 rounded-lg text-sm transition-colors hover:bg-primary/90 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {getButtonText()}
      </button>
    </>
  )
}

export default EnrollmentButton