import { useState, useMemo } from 'react'
import { EnrollmentContext } from './enrollment.context'
import { usePeriod } from '@/features/periods'
import { useEnroll } from '../hooks/useEnroll' 
import { getStudent } from '@/features/students/services/students.api'
import { getEnrollment } from '../services/enrollment.api'
import { getDaysRemaining } from '@common/utils/date.utils'
import { notify } from '@common/utils/notify.utils'
import Spinner from '@common/components/Spinner'

export const EnrollmentProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(null)
  const [enrolledGroup, setEnrolledGroup] = useState(null) 
  const [isLoading, setIsLoading] = useState(false) 

  const { 
    data: openPeriod, 
    isLoading: isPeriodLoading, 
    error: periodError 
  } = usePeriod({ isEnrollmentOpen: true })

  const { mutateAsync: enrollMutation } = useEnroll()

  const identifyStudent = async (dni) => {
    setIsLoading(true)
    try {
      const student = await getStudent({ dni })
      
      if (!student) {
        throw new Error('DNI_NOT_FOUND')
      }
      
      setStudentData(student)

      const enrollment = await getEnrollment({ 
        studentId: student.id, 
        periodId: openPeriod?.id 
      })

      if (enrollment) {
        setEnrolledGroup(enrollment.groups) 
        return 'ALREADY_ENROLLED' 
      }

      if (openPeriod) {
        return 'CAN_ENROLL' 
      } else {
        return 'PERIOD_CLOSED' 
      }

    } catch (error) {
      console.error('[identifyStudent]', error)
      if (error.message === 'DNI_NOT_FOUND') throw error
      throw new Error('IDENTIFICATION_FAILED') 
    } finally {
      setIsLoading(false)
    }
  }

  const enrollStudent = async (groupId) => {
    setIsLoading(true)
    try {
      if (!studentData?.id) throw new Error('No se ha identificado al estudiante')

      const newEnrollment = await enrollMutation({ 
        studentId: studentData.id, 
        groupId 
      })

      const confirmedEnrollment = await getEnrollment({ id: newEnrollment.id })
      setEnrolledGroup(confirmedEnrollment.groups)
      
      return true
    } catch (error) {
      console.error('[enrollStudent]', error)
      throw error 
    } finally {
      setIsLoading(false)
    }
  }

  const resetFlow = () => {
    setStudentData(null)
    setEnrolledGroup(null)
    setIsLoading(false)
  }

  const daysRemaining = openPeriod 
    ? getDaysRemaining(openPeriod.enrollment_close_at) 
    : null

  const value = useMemo(() => ({
    openPeriod,
    daysRemaining,
    studentData,
    enrolledGroup,
    isLoading: isLoading || isPeriodLoading,
    identifyStudent, 
    enrollStudent,
    resetFlow, 
  }), [openPeriod, daysRemaining, studentData, enrolledGroup, isLoading, isPeriodLoading])

  if (periodError) {
    notify('error', 'No se pudo verificar el estado del sistema.')
    return <div className="min-h-screen flex items-center justify-center">Sistema no disponible.</div>
  }

  if (isPeriodLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  )
}