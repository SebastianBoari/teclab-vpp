import { useState, useMemo } from 'react'
import { EnrollmentContext } from './enrollment.context'
import { usePeriod } from '@/features/periods'
import Spinner from '@/shared/ui/Spinner'

export const EnrollmentProvider = ({ children }) => {
  const [studentDni, setStudentDni] = useState('')
  const [studentData, setStudentData] = useState([])
  const [selectedGroup, setSelectedGroup] = useState([])

  const { 
    data: activePeriod, 
    isLoading: isPeriodLoading, 
    error: periodError 
  } = usePeriod()

  const value = useMemo(() => ({
    activePeriod, 
    studentDni,
    setStudentDni,
    studentData,
    setStudentData,
    selectedGroup,
    setSelectedGroup,
  }), [activePeriod, studentDni, studentData, selectedGroup])

  if (isPeriodLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (periodError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <h1 className="text-red-500">Error</h1>
        <h3 className="text-red-500">Ha ocurrido un problema que bloquea el correcto funcionamiento de la aplicación.</h3>
      </div>
    )
  }

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  )
}