import Header from '@/components/Header' 
import Spinner from '@/components/Spinner'
import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { GroupContainer } from '@/features/groups'
import { useEnrollmentContext } from '../context/useEnrollmentContext'
import { useStudentByDni } from '@/features/students'
import { notify } from '@/utils/utils'

const SelectGroup = () => {
  const { studentDni, studentData, setStudentData } = useEnrollmentContext()  
  const { 
    data: student,
    error: studentError,
    isSuccess: isStudentSuccess,
    isError: isStudentError, 
    isLoading: isStudentLoading 
  } = useStudentByDni(studentDni)

  const navigate = useNavigate()
  const prevStep = useCallback(() => {
    navigate('/inscripcion/alumno')
  }, [navigate])
  
  useEffect(() => {
    if(isStudentError){
      notify('error', studentError?.message || 'Error al obtener el alumno.')
      prevStep()
      return
    }
    
    if(isStudentSuccess){
      setStudentData(student)
      return
    }    
  }, [student, setStudentData, isStudentError, isStudentSuccess, studentError, prevStep])
  
  return (
    <div className="grow">
      <Header onBack={prevStep} sticky={true} title={'Selección de grupo'}/>
      
      {isStudentSuccess && (
        <GroupContainer studentId={studentData?.id} studentCareerId={studentData?.career_id}/>
      )}

      {isStudentLoading && (
        <Spinner/>
      )}
    </div>
  )
}

export default SelectGroup