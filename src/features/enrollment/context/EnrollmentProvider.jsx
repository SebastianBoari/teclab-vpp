import { useState, useMemo } from 'react'
import { EnrollmentContext } from './enrollment.context'

export const EnrollmentProvider = ({ children }) => {
  const [studentDni, setStudentDni] = useState('')
  const [studentData, setStudentData] = useState([])
  const [selectedGroup, setSelectedGroup] = useState([])

  const value = useMemo(() => ({
    studentDni,
    setStudentDni,
    studentData,
    setStudentData,
    selectedGroup,
    setSelectedGroup,
  }), [studentDni, studentData, selectedGroup])

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  )
}