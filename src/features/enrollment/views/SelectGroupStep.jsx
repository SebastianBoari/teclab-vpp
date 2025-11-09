import Header from '@/components/Header' 
import { useNavigate } from 'react-router'
import { GroupContainer } from '@/features/groups'
import { useParams } from 'react-router'
import { useStudentByDni } from '@/features/students'

const SelectGroup = () => {
  const navigate = useNavigate()
  
  const handleBack = () => {
    navigate('/inscripcion/alumno')
  }
  
  let { dni } = useParams()

  const { data: student, error } = useStudentByDni(dni)
  const careerId = student?.career_id
  const studentId = student?.id
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className='flex flex-col min-h-screen p-6'>
        <div className="flex-grow">
          <Header onBack={handleBack} sticky={true} title={'Selección de grupo'}/>
          
          <GroupContainer studentId={studentId} studentCareerId={careerId}/>

          {error && <p className="text-center text-gray-500">Error: vuelva al paso anterior y revise si ha ingresado correctamente el DNI.</p>}
        </div>
      </div>
    </div>
  )
}

export default SelectGroup