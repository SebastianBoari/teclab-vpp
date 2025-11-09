import { useState, useMemo } from 'react'
import { EnrollmentContext } from './enrollment.context'

export const EnrollmentProvider = ({ children }) => {
  const [dni, setDni] = useState('')
  const [studentData, setStudentData] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)

  const value = useMemo(() => ({
    dni,
    setDni,
    studentData,
    setStudentData,
    selectedGroup,
    setSelectedGroup,
  }), [dni, studentData, selectedGroup])

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  )
}