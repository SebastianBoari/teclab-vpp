import Header from '@/components/Header' 
import { useNavigate } from 'react-router'
import { GroupContainer } from '@/features/groups'
import { useStudentByDni } from '@/features/students'
import { useEnrollmentContext } from '../context/useEnrollmentContext.js'

const SelectGroup = () => {
  const navigate = useNavigate()
  
  const prevStep = () => {
    navigate('/inscripcion/alumno')
  }
  
  const { dni, setStudentData } = useEnrollmentContext()  
  const { data: student, error } = useStudentByDni(dni)
  const careerId = student?.career_id
  const studentId = student?.id
  
  if(!error) setStudentData(student)
    
  return (
    <div className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col min-h-screen justify-between p-6">
        <div className="grow">
          <Header onBack={prevStep} sticky={true} title={'Selección de grupo'}/>
          
          <GroupContainer studentId={studentId} studentCareerId={careerId}/>

          {error && <p className="text-center text-gray-500">Error: vuelva al paso anterior y revise si ha ingresado correctamente el DNI.</p>}
        </div>
      </div>
    </div>
  )
}

export default SelectGroup