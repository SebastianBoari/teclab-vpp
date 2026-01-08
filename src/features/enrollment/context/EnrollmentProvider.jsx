import { useState, useMemo } from 'react'
import { EnrollmentContext } from './enrollment.context'
import { usePeriod } from '@/features/periods'
import Spinner from '@components/Spinner'
import { notify } from '@utils/notify.utils'
import { getDaysRemaining } from '@common/utils/date.utils'

export const EnrollmentProvider = ({ children }) => {
  const [studentDni, setStudentDni] = useState('')
  const [studentData, setStudentData] = useState([])
  const [selectedGroup, setSelectedGroup] = useState([])

  const { 
    data: openPeriod, 
    isLoading: isPeriodLoading, 
    error: periodError 
  } = usePeriod({ isEnrollmentOpen: true})

  const daysRemaining = openPeriod 
    ? getDaysRemaining(openPeriod.enrollment_close_at) 
    : null

  const value = useMemo(() => ({
    openPeriod,
    daysRemaining, 
    studentDni,
    setStudentDni,
    studentData,
    setStudentData,
    selectedGroup,
    setSelectedGroup,
  }), [openPeriod, daysRemaining, studentDni, studentData, selectedGroup])

  if (isPeriodLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (periodError) {
    notify('error', periodError.message || 'Ha ocurrido un error inesperado.')
    return null
  }

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  )
}