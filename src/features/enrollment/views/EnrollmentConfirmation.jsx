import { useEnrollmentContext } from '../hooks/useEnrollmentContext'
import { GroupDetails } from '@/features/groups'
import Header from '@/shared/layout/Header'
import { useNavigate } from 'react-router'
const EnrollmentConfirmation = () => {
  const { setStudentDni, setStudentData, studentData, selectedGroup } = useEnrollmentContext()

  const navigate = useNavigate()
  const prevStep = () =>{
    setStudentDni('')
    setStudentData([])
    navigate('/inscripcion/alumno')
  } 

  return (
    <>
      <div className="grow">
        <Header onBack={prevStep} title={'Mi grupo'} sticky={true} />
        
        <GroupDetails group={selectedGroup} student={studentData}/>
      </div>
    </>
  )
}

export default EnrollmentConfirmation