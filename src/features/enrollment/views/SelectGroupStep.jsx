import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Header from '@common/layout/Header'
import { GroupContainer } from '@/features/groups'
import { useEnrollmentContext } from '../hooks/useEnrollmentContext'

const SelectGroup = () => {
  const navigate = useNavigate()
  
  const { studentData, openPeriod, resetFlow } = useEnrollmentContext()

  useEffect(() => {
    if (!studentData) {
      navigate('/inscripcion/alumno', { replace: true })
    }
  }, [studentData, navigate])

  const prevStep = () => {
    resetFlow()
    navigate('/inscripcion/alumno')
  }

  if (!studentData) return null

  return (
    <div className="grow flex flex-col">
      <Header 
        onBack={prevStep} 
        sticky={true} 
        title={'Selección de grupo'}
      />
      
      <main className="w-full max-w-3xl mx-auto p-4 pb-20">
        <GroupContainer 
          studentId={studentData.id} 
          careerId={studentData.career_id}
          periodId={openPeriod?.id}
        />
      </main>
    </div>
  )
}

export default SelectGroup