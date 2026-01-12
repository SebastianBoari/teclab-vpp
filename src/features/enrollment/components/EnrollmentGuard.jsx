import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useEnrollmentContext } from '../hooks/useEnrollmentContext'
import Spinner from '@common/components/Spinner'

const EnrollmentGuard = ({ children }) => {
  const { studentData, isLoading } = useEnrollmentContext()
  
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !studentData) {
      navigate('/inscripcion/alumno', { replace: true })
    }
  }, [isLoading, studentData, navigate])

  if (isLoading || !studentData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return children
}

export default EnrollmentGuard