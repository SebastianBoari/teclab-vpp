import Header from '@/shared/layout/Header' 
import Spinner from '@/shared/ui/Spinner'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { GroupContainer } from '@/features/groups'
import { useEnrollmentContext } from '../hooks/useEnrollmentContext'
import { useEnrolledGroup } from '../hooks/useEnrolledGroup'
import { notify } from '@/utils/utils'

const SelectGroup = () => {
  const { setStudentDni, studentData, setStudentData, activePeriod, setSelectedGroup } = useEnrollmentContext()
  
  const { 
    data: enrolledGroup,
    error: enrollmentError,
    isSuccess: isEnrollmentSuccess,
    isError: isEnrollmentError,
    isLoading: isEnrollmentLoading
  } = useEnrolledGroup(studentData?.id, activePeriod?.id)

  const navigate = useNavigate()

  const prevStep = () => {
    setStudentDni('')
    setStudentData([])
    navigate('/inscripcion/alumno')
  }
  
  useEffect(() => {
    if (isEnrollmentError) {
      notify('error', enrollmentError.message || 'Error al verificar inscripción.')
      navigate('/inscripcion/alumno')
      return
    }

    if (isEnrollmentSuccess) {
      if (enrolledGroup) {
        setSelectedGroup(enrolledGroup)
        navigate('/inscripcion/confirmacion')
      }
    }
  }, [
      isEnrollmentSuccess,
      enrolledGroup,
      setSelectedGroup,
      navigate,
      enrollmentError,
      isEnrollmentError,
      studentData
  ])

  return (
    <div className="grow">
      <Header onBack={prevStep} sticky={true} title={'Selección de grupo'}/>
      
      {!isEnrollmentLoading && !enrolledGroup && (
        <GroupContainer studentId={studentData?.id} studentCareerId={studentData?.career_id}/>
      )}

      {isEnrollmentLoading && (
        <Spinner/>
      )}
    </div>
  )
}

export default SelectGroup