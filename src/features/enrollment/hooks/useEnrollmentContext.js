import { useContext } from 'react'
import { EnrollmentContext } from '../context/enrollment.context.js'

export const useEnrollmentContext = () => {
  const context = useContext(EnrollmentContext)
  if (context === null) {
    throw new Error('useEnrollmentContext() debe usarse dentro de un <EnrollmentProvider>')
  }
  return context
}