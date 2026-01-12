import { useNavigate } from 'react-router'
import Header from '@common/layout/Header'
import { GroupContainer } from '@/features/groups'
import { useEnrollmentContext } from '../hooks/useEnrollmentContext'
import Spinner from '@common/components/Spinner'
const SelectGroup = () => {
  const navigate = useNavigate()
  
  const { studentData, openPeriod, resetFlow } = useEnrollmentContext()

  const prevStep = () => {
    resetFlow()
    navigate('/inscripcion/alumno')
  }

  if (!studentData || !openPeriod) return 

  return (
    <div className="grow flex flex-col">
      <Header 
        onBack={prevStep} 
        sticky={true} 
        title={'Selección de grupo'}
      />
      
      <main className="w-full max-w-3xl mx-auto p-4 pb-20">
        <GroupContainer 
          careerId={studentData.career_id}
          periodId={openPeriod?.id}
        />
      </main>
    </div>
  )
}

export default SelectGroup